import React, { useMemo, useState } from "react";
import Table from "../../../common/components/table/Table";
import { transformTableData } from "./device.helpers";
import {
  ANALYST_DEVICE_COLUMNS,
  DEVICE_COLUMNS,
  DEVICE_QUERY_KEY,
} from "../../device/devices.constant";
import { useFetchDevices } from "./hooks/useFetchDevices";
import { useNavigate } from "react-router-dom";
import { useFetchKPI } from "../../device/hooks/useFetchKPI";
import "../../../App.scss";
import ListingHeader from "../../../common/components/ListingHeader/ListingHeader";
import { transformIndicatorValue } from "../advisory.helpers";
import { ADVISOR_FILTER, order } from "../../../common/global.constant";
import { DeviceFilter } from "../../device/components";
import { useQueryClient } from "@tanstack/react-query";
import { ADVISOR_DEVICE_QUERY_KEY } from "../../approval/approval.constant";
import { toast } from "react-hot-toast";
import { updateSingleDevices } from "../../device/Services/Device.Services";

const Devices = () => {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ updatedOn: 0 });
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useFetchDevices(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );
  const kpiData = useFetchKPI();

  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  const onView = (data) => {
    navigate(`/advisor/devices/view/${data.deviceId}`);
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

  const handleAssigneeChange = async (email, id) => {
    const body = {
      deviceId: id,
      assignee: email,
    };
    await updateSingleDevices(body);
    queryClient.invalidateQueries([
      DEVICE_QUERY_KEY.LISTING_KEY,
      page,
      filterData,
    ]);
    toast.success(`Device Advisory assignee updated successfully`);
  };

  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.deviceResponseList,
        onView,
        handleAssigneeChange,
      }),
    [isLoading, isError, data?.data?.deviceResponseList]
  );

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          indicatorValues={INDICATOR_VALUES}
          title="Request Advice - Devices"
        />

        <DeviceFilter
          filterHandler={handleFilter}
          filterData={filterData}
          statusFilter={ADVISOR_FILTER}
        />

        {/* <DeviceFilter handleFilter={handleFilter} filterData={filterData} /> */}
        {!isError ? (
          <Table
            tableColumns={ANALYST_DEVICE_COLUMNS}
            tableData={transformTableFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={10}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
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
