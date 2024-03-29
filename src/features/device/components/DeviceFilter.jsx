import React, { useMemo, useState } from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useFetchManufacturer } from "../../manufacturer/hooks/useFetchManufacturer";
import { transManuFilterData } from "../device.helpers";
import "./DeviceFilter.scss";
import {
  ADVISOR_FILTER,
  FEATURE_MAPPING,
  FILTER_VALUES,
} from "../../../common/global.constant";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";

const DeviceFilter = ({ filterData, filterHandler, statusFilter }) => {
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });
  const ManufacturerList = useFetchManufacturer(1);

  const transManuData = useMemo(
    () =>
      !ManufacturerList.isLoading && !ManufacturerList.isError
        ? transManuFilterData(
            ManufacturerList?.data?.data?.manufacturerResponseDTOS
          )
        : [],
    [ManufacturerList.isError, ManufacturerList.isLoading]
  );

  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [],
    permissionTitle: [FEATURE_MAPPING.OS],
  });

  const ASSIGNEE_DATA = transformAssigneeData(data?.data);

  return (
    <div className="device-filter-wrapper">
      <div className="device-search">
        <SearchBar
          value={filterValues.searchKeyword}
          onValueChange={(e) => {
            setFilterValues({
              ...filterValues,
              searchKeyword: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.target.value === "") {
              filterHandler(e.target.value, "searchKeyword");
            }
          }}
          clickHandler={() =>
            filterHandler(filterValues.searchKeyword, "searchKeyword")
          }
        />
      </div>
      <div className="dropdown">
        <DropdownMultiSelect
          optionData={transManuData}
          placeholder="Select Manufacturer"
          selectedValues={filterData.manufacturerName}
          setSelectedValues={(value) =>
            filterHandler(value, "manufacturerName")
          }
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        {!isError && !isLoading && (
          <DropdownMultiSelect
            optionData={ASSIGNEE_DATA}
            placeholder="Select Assignee"
            selectedValues={filterData.assignee}
            setSelectedValues={(value) => filterHandler(value, "assignee")}
            width={200}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        )}
        <DropdownMultiSelect
          optionData={statusFilter}
          placeholder="Select Status"
          selectedValues={filterData.status}
          setSelectedValues={(value) => filterHandler(value, "status")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
      </div>
    </div>
  );
};

export default DeviceFilter;
