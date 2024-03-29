import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../common/components/table/Table";
import { ApprovalDeviceFilter } from "./components";
import useFetchApprovalDevice from "./hooks";
import {
  CHANGE_VALUE_APPROVAL,
  CHANGE_VALUE_REJECT,
  APPROVAL_DEVICE_QUERY_KEY,
  OVERLAY_REJECT_DATA,
  OVERLAY_APPROVAL_DATA,
} from "./approvalDevice.constant";
import { useQueryClient } from "@tanstack/react-query";
import {
  transformIndicatorValue,
  transformTableData,
} from "./approvalDevice.helpers";
import { updateSingleApprovalDevice } from "./services/approvalDeviceServices";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import "../../App.scss";
import {
  ANALYST_DEVICE_COLUMNS,
  DEVICE_COLUMNS,
} from "../device/devices.constant";
import { useFetchKPI } from "../device/hooks/useFetchKPI";
import { APPROAVAL_FILTER, KPI_KEY, order } from "../../common/global.constant";
import { ApprovalOverlay } from "../approval/components";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import { DeviceFilter } from "../device/components";
import { toast } from "react-hot-toast";
import { updateSingleDevices } from "../device/Services/Device.Services";

const ApprovalDevice = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { auth, setLoading } = useAuth();

  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ requestedOn: 0 });
  const [overlayData, setOverlayData] = React.useState(OVERLAY_REJECT_DATA);
  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });

  const kpiData = useFetchKPI();
  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  // Calling the Fetch Hook
  const { isLoading, isError, data } = useFetchApprovalDevice(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );
  const onView = (data) => {
    navigate(`/inventory/approval/devices/view/${data.deviceId}`);
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

  const handleApprovalDevice = async (data) => {
    setLoading(true);
    let commentdata = [];
    commentdata.push({
      commentDescription: "Approved",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    try {
      await updateSingleDevices({
        deviceId: data.deviceId,
        status: CHANGE_VALUE_APPROVAL[data.status],
        approvedOn: dateTransform(new Date()),
        approvedBy: auth.userDetails.email,
        assignee: data.updatedBy,
        requestedOn: null,
        requestedby: null,
        comments: commentdata,
      });
      queryClient.invalidateQueries([
        APPROVAL_DEVICE_QUERY_KEY.LISTING_KEY,
        page,
        filterData,
      ]);
      queryClient.invalidateQueries(KPI_KEY.DEVICE);
    } catch (err) {
      toast.error(JSON.parse(err.request.response).message);
    } finally {
      setLoading(false);
      setOpenOverlay(false);
    }
  };

  const handleReject = async (data, checkBoxBool, comment) => {
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
      deviceId: data.deviceId,
      comments: commentdata,
      status: CHANGE_VALUE_REJECT[data.status],
      assignee: data.updatedBy,
      requestedOn: null,
      requestedby: null,
    };
    await updateSingleApprovalDevice(bodyToSend);
    queryClient.invalidateQueries([
      APPROVAL_DEVICE_QUERY_KEY.LISTING_KEY,
      page,
      filterData,
    ]);
    queryClient.invalidateQueries(KPI_KEY.DEVICE);
    setOpenOverlay(false);
    setLoading(false);
  };
  const handleAssigneeChange = async (email, id, status) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assignee Changed",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const body = {
      deviceId: id,
      assignee: email,
      comments: commentdata,
      status: status,
    };
    await updateSingleDevices(body);
    queryClient.invalidateQueries([
      APPROVAL_DEVICE_QUERY_KEY.LISTING_KEY,
      page,
      filterData,
    ]);
    queryClient.invalidateQueries(KPI_KEY.DEVICE);
    toast.success(`Device Approver assignee updated successfully`);
  };

  const transFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.deviceResponseList,
        onView,
        onApproval,
        onReject,
        handleAssigneeChange,
      }),
    [isLoading, isError, data?.data?.deviceResponseList]
  );

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          title="Approval Request - Device"
          indicatorValues={INDICATOR_VALUES}
        />

        <DeviceFilter
          filterHandler={handleFilter}
          filterData={filterData}
          statusFilter={APPROAVAL_FILTER}
        />

        {!isError ? (
          <Table
            tableColumns={ANALYST_DEVICE_COLUMNS}
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
            handleApproval={handleApprovalDevice}
            handleReject={handleReject}
            overlayData={overlayData}
          />
        )}
      </div>
    </>
  );
};

export default ApprovalDevice;
