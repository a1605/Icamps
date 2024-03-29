import React, { useMemo } from "react";
import Table from "../../common/components/table/Table";
import { ApprovalOsFilter } from "./components";
import useFetchApprovalOs from "./hooks";
import { useFetchKPI } from "../os/hooks/useFetchKPI";
import {
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  APPROVAL_OS_QUERY_KEY,
  OVERLAY_REJECT_DATA,
  OVERLAY_APPROVAL_DATA,
} from "./approvalOs.constant";
import { useQueryClient } from "@tanstack/react-query";
import {
  transformIndicatorValue,
  transformTableData,
} from "./approvalOs.helpers";
import { updateSingleApprovalOs } from "./services/approvalOsServices";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import "../../App.scss";
import { ANALYST_OS_COLUMNS, OS_COLUMNS } from "../os/os.constant";
import { useNavigate } from "react-router-dom";
import { KPI_KEY, order } from "../../common/global.constant";
import { ApprovalOverlay } from "../approval/components";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import { toast } from "react-hot-toast";

const ApprovalOs = () => {
  const queryClient = useQueryClient();
  const { auth, setLoading } = useAuth();
  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ requestedOn: 0 });
  const [overlayData, setOverlayData] = React.useState(OVERLAY_REJECT_DATA);
  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });

  // Calling the Fetch Hook
  const { isLoading, isError, data } = useFetchApprovalOs(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );
  const navigate = useNavigate();
  const kpiData = useFetchKPI();

  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  const onView = (data) => {
    navigate("/approval/os/view/" + data.osId);
  };

  const onReject = (data) => {
    setOverlayData({ ...OVERLAY_REJECT_DATA, data: data });
    setOpenOverlay(true);
  };

  const onApproval = (data) => {
    setOverlayData({ ...OVERLAY_APPROVAL_DATA, data: data });
    setOpenOverlay(true);
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

  const handleApprovalOs = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Approved",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    try {
      setLoading(true);
      await updateSingleApprovalOs({
        ...data,
        comments: commentdata,
        assignee: data.updatedBy,
        approvedBy: auth.userDetails.email,
        approvedOn: dateTransform(new Date()),
        status: CHANGE_VALUE_APPROVAL[data.status],
        requestedOn: null,
        requestedby: null,
      });
      queryClient.invalidateQueries([APPROVAL_OS_QUERY_KEY.LISTING_KEY, page]);
      queryClient.invalidateQueries(KPI_KEY.OS);
      setOpenOverlay(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectOs = async (data, checkBoxBool, comment) => {
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
        requestedOn: null,
        requestedby: null,
      };
      await updateSingleApprovalOs(bodyToSend);
      queryClient.invalidateQueries([APPROVAL_OS_QUERY_KEY.LISTING_KEY, page]);
      queryClient.invalidateQueries(KPI_KEY.OS);
      setOpenOverlay(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
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
      osId: id,
      assignee: email,
      comments: commentdata,
      status: status,
    };
    await updateSingleApprovalOs(body);
    queryClient.invalidateQueries([APPROVAL_OS_QUERY_KEY.LISTING_KEY, page]);
    queryClient.invalidateQueries(KPI_KEY.OS);
    toast.success(`OS Approver assignee updated successfully`);
  };
  const transFormData = useMemo(() => {
    if (!isLoading && !isError)
      return transformTableData({
        data: data?.data?.osresponseDto,
        onView,
        onApproval,
        onReject,
        handleAssigneeChange,
      });
    else return [];
  }, [(isLoading, isError, data?.data?.osresponseDto)]);

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          title="Approval Request - OS"
          indicatorValues={INDICATOR_VALUES}
        />
        <ApprovalOsFilter
          filterData={filterData}
          filterHandler={handleFilter}
        />
        {!isError ? (
          <Table
            tableColumns={ANALYST_OS_COLUMNS}
            tableData={transFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={15}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
          />
        ) : (
          <div>
            <p>Something Went Wrong</p>
          </div>
        )}
        {openOverlay && (
          <ApprovalOverlay
            open={openOverlay}
            closeOverlay={() => setOpenOverlay(false)}
            handleApproval={handleApprovalOs}
            handleReject={handleRejectOs}
            overlayData={overlayData}
          />
        )}
      </div>
    </>
  );
};

export default ApprovalOs;
