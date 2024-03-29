import React, { useState, useMemo } from "react";
import {
  GLOBAL_STATUS,
  KPI_KEY,
  SCREEN_TYPE,
  order,
} from "../../common/global.constant";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import Table from "../../common/components/table/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchBlacklistingNumber } from "../../features/blacklist-number/hooks/useFetchBlacklistingNumber";
import {
  BLACKLIST_NUMBER_COLUMNS,
  OVERLAY_REJECT_DATA,
  OVERLAY_APPROVAL_DATA,
  CHANGE_VALUE_APPROVAL,
  APPROVAL_BLACKLIST_QUERY_KEY,
  CHANGE_VALUE_REJECT,
  ANALYST_BLACKLIST_NUMBER_COLUMNS,
} from "./blacklist-number.constant";
import BlacklistFilter from "./components/BlacklistFilter";
import {
  transformIndicatorValue,
  transformIndicatorValueAdvicry,
  transformIndicatorValueApproval,
  transformTableData,
} from "./blacklist-number-helper";
import { toast } from "react-hot-toast";
import "../../App.scss";
import {
  deleteSingleBlacklistNumber,
  updateSingleBlacklistNumber,
} from "./services/blacklisting-number-services";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import BlacklistOverlay from "./components/BlacklistOverlay";
import { statusChangeOnCancel } from "../../common/helperFunction/statusHelper";
import { useFetchKPI } from "./hooks/useFetchKPI";
import Overlay from "../../common/components/Overlay/Overlay";
import { useAuth } from "../../common/hooks/useAuth";

const BlacklistNumber = () => {
  const { screenType } = useParams();
  const [overlayData, setOverlayData] = React.useState(OVERLAY_REJECT_DATA);
  const [openOverlay, setOpenOverlay] = React.useState(false);

  let status = [];

  switch (screenType) {
    case "advisor":
      status = [GLOBAL_STATUS.ADVICE_A, GLOBAL_STATUS.ADVICE_C];
      break;
    case "approval":
      status = [GLOBAL_STATUS.REQ_UNPUBLISHED, GLOBAL_STATUS.SUBMITTED];
      break;
  }
  const { auth, setLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const [filterData, setFilterData] = useState({ searchKeyword: "" });
  const { isLoading, isError, data } = useFetchBlacklistingNumber(
    page,
    filterData,
    status,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const kpiData = useFetchKPI();
  const INDICATOR_VALUES = () => {
    if (screenType === SCREEN_TYPE.APPROVAL) {
      return transformIndicatorValueApproval(kpiData?.data?.data);
    } else if (screenType === SCREEN_TYPE.ADVISOR) {
      return transformIndicatorValueAdvicry(kpiData?.data?.data);
    } else {
      return transformIndicatorValue(kpiData?.data?.data);
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

  const onReject = (data) => {
    setOverlayData({ ...OVERLAY_REJECT_DATA, data: data });
    setOpenOverlay(true);
  };

  const onApproval = (data) => {
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, data: data });
    setOpenOverlay(true);
  };

  const handleApprovalNumber = async (data) => {
    try {
      setLoading(true);
      let commentdata = [];
      commentdata.push({
        commentDescription: "Approved",
        email: auth.userDetails.email,
        updatedOn: dateTransform(new Date()),
      });

      await updateSingleBlacklistNumber({
        ...data,
        status: CHANGE_VALUE_APPROVAL[data.status],
        approvedOn: dateTransform(new Date()),
        comments: commentdata,
        approvedBy: auth.userDetails.email,
        assignee: data.updatedBy,
      });
      queryClient.invalidateQueries([
        APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
        page,
        filterData,
        status,
      ]);
      queryClient.invalidateQueries(KPI_KEY.BLACKLIST);
      setOpenOverlay(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (data, checkBoxBool, comment) => {
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
        ...data,
        comments: commentdata,
        status: CHANGE_VALUE_REJECT[data.status],
        assignee: data.updatedBy,
      };
      await updateSingleBlacklistNumber(bodyToSend);
      queryClient.invalidateQueries([
        APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
        page,
        filterData,
        status,
      ]);
      queryClient.invalidateQueries(KPI_KEY.BLACKLIST);
      setOpenOverlay(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (data) => {
    if (screenType !== undefined) {
      navigate(
        `/inventory/${screenType}/blacklistedNumber/edit/${data.blackListedNumberId}`
      );
      return;
    }
    navigate(`/inventory/blacklistedNumber/edit/${data.blackListedNumberId}`);
  };

  const onView = (data) => {
    if (screenType !== undefined) {
      navigate(
        `/inventory/${screenType}/blacklistedNumber/view/${data.blackListedNumberId}`
      );
      return;
    }
    navigate(`/inventory/blacklistedNumber/view/${data.blackListedNumberId}`);
  };

  const onDelete = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Deleted",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const dataValue = {
      ...data,
      comments: commentdata,
      status: GLOBAL_STATUS.DELETED,
    };
    try {
      await updateSingleBlacklistNumber(dataValue);
      queryClient.invalidateQueries([
        APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
        page,
        filterData,
        status,
      ]);
      queryClient.invalidateQueries(KPI_KEY.BLACKLIST);
      toast.success("Mobile Number is deleted successfully");
    } catch (error) {
      toast.error(err?.response?.data?.message || err.message);
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
      blackListedNumberId: id,
      assignee: email,
      comments: commentdata,
      status: status,
    };
    await updateSingleBlacklistNumber(body);
    queryClient.invalidateQueries([
      APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
      page,
      filterData,
      status,
    ]);
    queryClient.invalidateQueries(KPI_KEY.BLACKLIST);
    toast.success(` Blacklist assignee updated successfully`);
  };
  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.blackListedNumberList,
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
          await updateSingleBlacklistNumber({
            blackListedNumberId: item.blackListedNumberId,
            comments: commentdata,
            status: statusChangeOnCancel(item.status),
            requestedOn: null,
            requestedBy: null,
            assignee: `${auth.userDetails.email.toLowerCase()}`,
          });
          queryClient.invalidateQueries([
            APPROVAL_BLACKLIST_QUERY_KEY.LISTING_KEY,
            page,
            filterData,
            status,
          ]);
          queryClient.invalidateQueries(KPI_KEY.BLACKLIST);
          toast.success("Mobile Number cancelled successfully");
        },
      }),
    [isLoading, isError, data?.data?.blackListedNumberList]
  );

  return (
    <div className="page-background ">
      <ListingHeader
        indicatorValues={INDICATOR_VALUES()}
        screenType={screenType}
        title={
          screenType === SCREEN_TYPE.APPROVAL
            ? "Approval Request - Blacklisted Numbers"
            : screenType === SCREEN_TYPE.ADVISOR
            ? "Request Advice - Blacklisted Numbers"
            : "Blacklisted Numbers"
        }
        iconButtonTitle="Add"
        pathToNavigate={"/inventory/blacklistedNumber/create"}
        permissionTitle="blacklisted number"
        bulkUploadTitle="Bulk Upload"
        bulkNavigate="/bulk-upload/blacklistedNumber"
      />
      <BlacklistFilter
        filterHandler={handleFilter}
        screenType={screenType}
        filterData={filterData}
      />
      {!isError ? (
        <Table
          tableColumns={
            !screenType
              ? BLACKLIST_NUMBER_COLUMNS
              : ANALYST_BLACKLIST_NUMBER_COLUMNS
          }
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
          handleApproval={handleApprovalNumber}
          handleReject={handleReject}
          overlayData={overlayData}
        />
      )}
    </div>
  );
};

export default BlacklistNumber;
