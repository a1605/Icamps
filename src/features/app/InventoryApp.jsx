import React, { useState, useMemo } from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import {
  ANALYST_APPS_COLUMNS,
  APPROVAL_APP_QUERY_KEY,
  APPS_COLUMNS,
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  INVENTORY_QUERY_KEY,
  OVERLAY_APPROVAL_DATA,
  OVERLAY_REJECT_DATA,
} from "./app.constant";
import AppsFilter from "../app/components/AppsFilter";
import Table from "../../common/components/table/Table";
import { useNavigate, useParams } from "react-router-dom";
import { updateSingleApplication } from "./Services/appServices";
import { useQueryClient } from "@tanstack/react-query";
import {
  transformIndicatorValue,
  transformIndicatorValueAdvisory,
  transformIndicatorValueApproval,
  transformTableData,
} from "./application.helper";
import {
  GLOBAL_STATUS,
  KPI_KEY,
  SCREEN_TYPE,
  order,
} from "../../common/global.constant";
import "../../App.scss";
import { useFetchKPI } from "./hooks/useFetchKPI";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import { statusChangeOnCancel } from "../../common/helperFunction/statusHelper";
import Overlay from "../../common/components/Overlay/Overlay";
import { toast } from "react-hot-toast";
import { useFetchAppWithStatus } from "./hooks/useFetchApps";
import { useAuth } from "../../common/hooks/useAuth";

const InventoryApp = () => {
  const [page, setPage] = useState(1);
  const { auth, setLoading } = useAuth();

  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const { screenType } = useParams();
  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [overlayData, setOverlayData] = React.useState(OVERLAY_REJECT_DATA);

  const status = useMemo(() => {
    switch (screenType) {
      case "advisor":
        return [GLOBAL_STATUS.ADVICE_A, GLOBAL_STATUS.ADVICE_C];
      case "approval":
        return [GLOBAL_STATUS.REQ_UNPUBLISHED, GLOBAL_STATUS.SUBMITTED];
      default:
        return [];
    }
  }, [screenType]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filterData, setFilterData] = useState({ searchKeyword: "" });
  const kpiData = useFetchKPI();

  const INDICATOR_VALUES = () => {
    if (screenType === SCREEN_TYPE.APPROVAL) {
      return transformIndicatorValueApproval(kpiData?.data?.data);
    } else if (screenType === SCREEN_TYPE.ADVISOR) {
      return transformIndicatorValueAdvisory(kpiData?.data?.data);
    } else {
      return transformIndicatorValue(kpiData?.data?.data);
    }
  };

  const { isLoading, isError, data } = useFetchAppWithStatus(
    page,
    filterData,
    status,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const onEdit = (data) => {
    if (screenType) {
      navigate(`/inventory/${screenType}/apps/edit/${data?.applicationId}`);
      return;
    }
    navigate(`/inventory/apps/edit/${data?.applicationId}`);
  };
  const onView = (data) => {
    if (screenType) {
      navigate(`/inventory/${screenType}/apps/view/${data?.applicationId}`);
      return;
    }
    navigate(`/inventory/apps/view/${data?.applicationId}`);
  };

  const onDelete = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Deleted",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const dataValue = {
      applicationId: data.applicationId,
      status: GLOBAL_STATUS.DELETED,
      comments: commentdata,
      assignee: data.assignee,
    };
    try {
      await updateSingleApplication(dataValue);
      queryClient.invalidateQueries([INVENTORY_QUERY_KEY.APP_LISTING, page]);
      queryClient.invalidateQueries(KPI_KEY.APP);
      toast.success(`App  ${data.applicationName} deleted successfully`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
  const onReject = (data) => {
    setOverlayData({ ...OVERLAY_REJECT_DATA, data: data });
    setOpenOverlay(true);
  };

  const onApproval = (data) => {
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, data: data });
    setOpenOverlay(true);
  };

  const handleAppApproval = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Approved",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    try {
      setLoading(true);
      await updateSingleApplication({
        applicationId: data.applicationId,
        status: CHANGE_VALUE_APPROVAL[data.status],
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        comments: commentdata,
        assignee: data.updatedBy,
      });
      queryClient.invalidateQueries([
        APPROVAL_APP_QUERY_KEY.LISTING_KEY,
        page,
        filterData,
        status,
      ]);
      queryClient.invalidateQueries(KPI_KEY.APP);

      setOpenOverlay(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value, key) => {
    setPage(1);
    if (key === "searchKeyword") {
      setFilterData({
        ...filterData,
        searchKeyword: value,
      });
      return;
    }
    if (value.length > 0)
      return setFilterData({
        ...filterData,
        [key]: value.map((item) => item.id),
      });
    const { [key]: keyData, ...data } = filterData;
    setFilterData(data);
  };

  const handleAppReject = async (data, checkBoxBool, comment) => {
    setLoading(true);
    try {
      let commentdata = [];
      if (comment !== "") {
        commentdata.push({
          commentDescription: comment,
          email: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
        });
      } else if (Object.values(checkBoxBool).includes(true)) {
        let concatedComments = "";
        Object.keys(checkBoxBool).forEach((item) => {
          if (checkBoxBool[item]) {
            concatedComments =
              concatedComments === "" ? item : `${concatedComments}; ${item}`;
          }
        });
        commentdata.push({
          commentDescription: concatedComments,
          email: auth.userDetails.email,
          updatedOn: dateTransform(new Date()),
        });
      } else {
        toast.error("Please add rejection comment");
        return;
      }
      const bodyToSend = {
        applicationId: data.applicationId,
        comments: commentdata,
        status: CHANGE_VALUE_REJECT[data.status],
        assignee: data.updatedBy,
      };
      await updateSingleApplication(bodyToSend);
      queryClient.invalidateQueries(
        APPROVAL_APP_QUERY_KEY.LISTING_KEY,
        page,
        filterData,
        status
      );
      queryClient.invalidateQueries(KPI_KEY.APP);

      setOpenOverlay(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAssigneeChange = async (email, id, status) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assignee Changed",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const body = {
      applicationId: id,
      assignee: email,
      comments: commentdata,
      status: status,
    };
    await updateSingleApplication(body);
    queryClient.invalidateQueries([INVENTORY_QUERY_KEY.APP_LISTING, page]);
    queryClient.invalidateQueries(KPI_KEY.APP);
    toast.success(` OS assignee updated successfully`);
  };
  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.applicationResponseList,
        onEdit,
        onView,
        onDelete,
        onApproval,
        onReject,
        screenType,
        handleAssigneeChange,
        onCancelRequest: async (item) => {
          let commentdata = [];
          commentdata.push({
            commentDescription: "Cancel Request",
            email: auth.userDetails.email,
            updatedOn: dateTransform(new Date()),
          });
          await updateSingleApplication({
            applicationId: item.applicationId,
            status: statusChangeOnCancel(item.status),
            comments: commentdata,
            requestedOn: null,
            requestedBy: null,
            assignee: `${auth.userDetails.email.toLowerCase()}`,
          });
          queryClient.invalidateQueries([
            INVENTORY_QUERY_KEY.APP_LISTING,
            page,
          ]);
          queryClient.invalidateQueries(KPI_KEY.APP);
          toast.success(`App ${item.applicationName} cancelled successfully`);
        },
      }),
    [isLoading, isError, data?.data?.applicationResponseList]
  );
  return (
    <div className="page-background ">
      <ListingHeader
        indicatorValues={INDICATOR_VALUES()}
        {...(screenType === SCREEN_TYPE.ADVISOR
          ? { title: "Request Advice - APP" }
          : { title: "APP" })}
        {...(screenType === SCREEN_TYPE.APPROVAL
          ? { title: "Approval Request - APP" }
          : {})}
        iconButtonTitle="Add"
        screenType={screenType}
        pathToNavigate="/inventory/apps/create"
        permissionTitle={"apps"}
        bulkUploadTitle="Bulk Upload"
        bulkNavigate="/bulk-upload/apps"
      />
      <AppsFilter
        screenType={screenType}
        filterData={filterData}
        setFilterData={setFilterData}
        filterHandler={handleFilter}
      />
      {!isError ? (
        <Table
          tableColumns={!screenType ? APPS_COLUMNS : ANALYST_APPS_COLUMNS}
          tableData={transformTableFormData}
          paginationCount={data?.data?.pageSize}
          isLoading={isLoading}
          handlePaginationValue={setPage}
          rowCount={15}
          sortingStatus={sortingStatus}
          setSortingStatus={setSortingStatus}
          currentPage={page}
        />
      ) : (
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <p>Something Went Wrong</p>
        </div>
      )}
      {openOverlay && (
        <Overlay
          open={openOverlay}
          closeOverlay={() => setOpenOverlay(false)}
          handleApproval={handleAppApproval}
          handleReject={handleAppReject}
          overlayData={overlayData}
        />
      )}
    </div>
  );
};

export default InventoryApp;
