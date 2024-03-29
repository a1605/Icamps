import React, { useState, useMemo } from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import {} from "../approvalOs.helpers";
import { FILTER_VALUES } from "../../approval/approval.constant";
import "./ApprovalOsFilter.scss";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";
import {
  FEATURE_MAPPING,
  PERMISSION_MAPPING,
} from "../../../common/global.constant";
import { transformManuAOSPData, transformManuData } from "../../os/os.helper";
import { useFetchOSFilter } from "../../os/hooks/useFetchOSFilter";

const ApprovalOsFilter = ({ filterData, filterHandler }) => {
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });

  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [PERMISSION_MAPPING.APPROVER],
    permissionTitle: [FEATURE_MAPPING.NEWS],
  });
  const OsList = useFetchOSFilter();

  const transManuData = useMemo(
    () =>
      !OsList.isLoading && !OsList.isError
        ? transformManuData(OsList?.data?.data)
        : [],
    [OsList.isError, OsList.isLoading]
  );

  const transManuAOSPData = useMemo(
    () =>
      !OsList.isLoading && !OsList.isError
        ? transformManuAOSPData(OsList?.data?.data)
        : [],
    [OsList.isError, OsList.isLoading]
  );

  const assigneeData = useMemo(
    () => (!isLoading && !isError ? transformAssigneeData(data?.data) : []),
    [isLoading, isError, data?.data]
  );

  return (
    <div className="approval-os-filter-wrapper">
      <div className="approval-os-search">
        <SearchBar
          value={filterValues.searchKeyword}
          onValueChange={(e) => {
            setFilterValues({
              ...filterValues,
              searchKeyword: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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
          placeholder="OS Name"
          selectedValues={filterData?.devices}
          setSelectedValues={(value) => filterHandler(value, "devices")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        <DropdownMultiSelect
          optionData={transManuAOSPData}
          placeholder="AOSP Codename"
          selectedValues={filterData?.aospCodename}
          setSelectedValues={(value) => filterHandler(value, "aospCodename")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        {!isLoading && !isError && (
          <div>
            <DropdownMultiSelect
              optionData={assigneeData}
              placeholder="Assignee"
              selectedValues={filterData.assignee}
              setSelectedValues={(value) => filterHandler(value, "assignee")}
              width={200}
              showChips={false}
              disableCloseOnSelect={true}
              searchable={true}
            />
          </div>
        )}
        <div>
          <DropdownMultiSelect
            optionData={FILTER_VALUES}
            placeholder="All Status"
            selectedValues={filterData.status}
            setSelectedValues={(value) => filterHandler(value, "status")}
            width={200}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
      </div>
    </div>
  );
};
export default ApprovalOsFilter;
