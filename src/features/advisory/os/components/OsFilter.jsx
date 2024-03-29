import React, { useMemo } from "react";
import SearchBar from "../../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useFetchOSFilter } from "../hooks/useFetchOSFilter";
import { transformManuData } from "../os.helper";
import "./OsFilter.scss";
import {
  ADVISOR_FILTER,
  FEATURE_MAPPING,
} from "../../../../common/global.constant";
import { transformAssigneeData } from "../../../../common/helperFunction/assigneeDataTransform";
import { transformManuAOSPData } from "../../../os/os.helper";
import { useFetchAssigneeList } from "../../../../hooks/useFetchAssigneeList";

const OsFilter = ({ filterHandler, filterData }) => {
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });
  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [],
    permissionTitle: [FEATURE_MAPPING.OS],
  });
  const OsList = useFetchOSFilter();
  const ASSIGNEE_DATA = transformAssigneeData(data?.data);
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

  return (
    <div className="os-filter-wrapper">
      <div className="os-search">
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
          <DropdownMultiSelect
            optionData={ASSIGNEE_DATA}
            placeholder="Select Assigee"
            selectedValues={filterData?.assignee}
            setSelectedValues={(value) => filterHandler(value, "assignee")}
            width={200}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        )}

        <DropdownMultiSelect
          optionData={ADVISOR_FILTER}
          placeholder="Search Status"
          selectedValues={filterData?.status}
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

export default OsFilter;
