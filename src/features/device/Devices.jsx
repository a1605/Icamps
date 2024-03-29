import React, { useMemo } from "react";
import Table from "../../common/components/table/Table";
import { DeviceFilter } from "./components";
import { transformIndicatorValue, transformTableData } from "./device.helpers";
import { DEVICE_COLUMNS, DEVICE_QUERY_KEY } from "./devices.constant";
import { useFetchDevices } from "./hooks/useFetchDevices";
import { useNavigate } from "react-router-dom";
import { updateSingleDevices } from "./Services/Device.Services";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  FILTER_VALUES,
  GLOBAL_STATUS,
  KPI_KEY,
  order,
} from "../../common/global.constant";
import "../../App.scss";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import { useFetchKPI } from "./hooks/useFetchKPI";
import { statusChangeOnCancel } from "../../common/helperFunction/statusHelper";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";

const Devices = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const kpiData = useFetchKPI();
  const { auth } = useAuth();

  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ updatedOn: 0 });
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });

  const { data, isLoading, isError } = useFetchDevices(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const onEdit = (data) => {
    navigate(`/inventory/devices/edit/${data.deviceId}`);
  };
  const onView = (data) => {
    navigate(`/inventory/devices/view/${data.deviceId}`);
  };

  const onDelete = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Deleted",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const dataValue = { ...data, comments: commentdata, status: GLOBAL_STATUS.DELETED };
    try {
      await updateSingleDevices(dataValue);
      queryClient.invalidateQueries([DEVICE_QUERY_KEY.LISTING_KEY, page]);
      queryClient.invalidateQueries(KPI_KEY.DEVICE);
      toast.success(`Device ${data.modelNo} deleted Successfully`);
    } catch (error) {
      toast.error(error.message);
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
  const handleAssigneeChange = async (email, id,status) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assignee Changed",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const body = {
      deviceId: id,
      assignee: email,
      comments:commentdata,
      status:status
    };
    await updateSingleDevices(body);
    queryClient.invalidateQueries([DEVICE_QUERY_KEY.LISTING_KEY, page]);
    queryClient.invalidateQueries(KPI_KEY.DEVICE);
    toast.success("Device Assignee Updated successfully");
  };

  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.deviceResponseList,
        onEdit,
        onView,
        onDelete,
        handleAssigneeChange,
        onCancelRequest: async (item) => {
          let commentdata = [];
          commentdata.push({
            commentDescription: "cancel request",
            email: auth.userDetails.email,
            updatedOn: dateTransform(new Date()),
          });
          await updateSingleDevices({
            deviceId: item.deviceId,
            status: statusChangeOnCancel(item.status),
            requestedOn: null,
            comments: commentdata,
            requestedBy: null,
            assignee: `${auth.userDetails.email.toLowerCase()}`,
          });
          queryClient.invalidateQueries([DEVICE_QUERY_KEY.LISTING_KEY, page]);
          queryClient.invalidateQueries(KPI_KEY.DEVICE);
          toast.success(`Device ${item.modelNo} cancelled Successfully`);
        },
      }),
    [isLoading, isError, data?.data?.deviceResponseList]
  );

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          iconButtonTitle="Add"
          pathToNavigate={"/inventory/devices/create"}
          title="Devices"
          indicatorValues={INDICATOR_VALUES}
          permissionTitle="devices"
          bulkUploadTitle="Bulk Upload"
          bulkNavigate="/bulk-upload/devices"
        />
        <DeviceFilter
          filterHandler={handleFilter}
          filterData={filterData}
          statusFilter={FILTER_VALUES}
        />
        {!isError ? (
          <Table
            tableColumns={DEVICE_COLUMNS}
            tableData={transformTableFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={10}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
            currentPage={page}
          />
        ) : (
          <div>
            <p>Something Went Wrong</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Devices;
