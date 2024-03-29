import React, { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Components
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import Table from "../../common/components/table/Table";
import { ApprovalFilter, ApprovalOverlay } from "./components";

// Hooks
import useFetchApproval from "./hooks";

// Helper
import {
  transformIndicatorValue,
  transformTableData,
} from "./approval.helpers";

// Services
import { updateSingleApproval } from "./services/approvalServices";

// Constant
import {
  APPROVAL_COLUMNS,
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  APPROVAL_QUERY_KEY,
  OVERLAY_REJECT_DATA,
  OVERLAY_APPROVAL_DATA,
} from "./approval.constant";

// CSS
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import { useAuth } from "../../common/hooks/useAuth";
import { useFetchKPI } from "../news/hooks/useFetchKPI";
import { toast } from "react-hot-toast";
import { order } from "../../common/global.constant";

const Approval = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { auth, setLoading } = useAuth();

  const kpiData = useFetchKPI();

  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ requestedOn: 0 });
  const [overlayData, setOverlayData] = React.useState({
    functionality: "reject",
    data: {},
  });

  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });

  // Calling the Fetch Hook
  const { isLoading, isError, data } = useFetchApproval(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const onView = (data) => {
    navigate(`/information/view/approval/${data.informationId}`);
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

  const handleApproval = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Approved",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    try {
      setLoading(true);
      await updateSingleApproval({
        informationId: data.informationId,
        status: CHANGE_VALUE_APPROVAL[data.status],
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        assignee: data.requestedBy,
        requestedOn: null,
        comments: commentdata,
        requestedby: null,
        updatedBy: data.updatedBy,
        updatedOn: data.updatedOn,
      });
      setOpenOverlay(false);

      queryClient.invalidateQueries([APPROVAL_QUERY_KEY.LISTING_KEY, page]);
      queryClient.invalidateQueries("get-kpi");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (data, checkBoxBool, comment) => {
    try {
      setLoading(true);
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
        assignee: data.requestedBy,
        requestedOn: null,
        requestedBy: null,
        updatedBy: data.updatedBy,
        updatedOn: data.updatedOn,
      };
      await updateSingleApproval(bodyToSend);
      queryClient.invalidateQueries([APPROVAL_QUERY_KEY.LISTING_KEY, page]);
      queryClient.invalidateQueries("get-kpi");
      setOpenOverlay(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleAssigneeChange = async (
    email,
    id,
    status,
    approvedBy,
    approvedOn,
    requestedBy,
    requestedOn
  ) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assignee Changed",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const body = {
      informationId: id,
      assignee: email,
      approvedBy: approvedBy,
      approvedOn: approvedOn,
      requestedBy: requestedBy,
      requestedOn: requestedOn,
      comments: commentdata,
      status: status,
    };
    await updateSingleApproval(body);
    queryClient.invalidateQueries([APPROVAL_QUERY_KEY.LISTING_KEY, page]);
    queryClient.invalidateQueries("get-kpi");
    toast.success(`Information assignee updated successfully`);
  };

  const transFormData = useMemo(() => {
    if (!isLoading && !isError)
      return transformTableData({
        data: data?.data?.informationResponseListing,
        onView,
        onApproval,
        onReject,
        handleAssigneeChange,
      });
    else return [];
  }, [isLoading, isError, data?.data?.informationResponseListing]);

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          title={"Approval Request - Information"}
          indicatorValues={INDICATOR_VALUES}
        />
        <ApprovalFilter filterHandler={handleFilter} filter={filterData} />
        {!isError ? (
          <Table
            tableColumns={APPROVAL_COLUMNS}
            tableData={transFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={15}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
            currentPage={page}
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
            handleApproval={handleApproval}
            handleReject={handleReject}
            overlayData={overlayData}
          />
        )}
      </div>
    </>
  );
};

export default Approval;
