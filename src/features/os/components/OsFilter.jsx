import React, { useMemo } from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useFetchOSFilter } from "../hooks/useFetchOSFilter";
import { transformManuAOSPData, transformManuData } from "../os.helper";
import "./OsFilter.scss";
import {
  FEATURE_MAPPING,
  FILTER_VALUES,
} from "../../../common/global.constant";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";

const OsFilter = ({ filterHandler, filterData }) => {
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
    osName: [],
    assignee: [],
    aospCodename: [],
    status: [],
  });
  const OsList = useFetchOSFilter();

  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [],
    permissionTitle: [FEATURE_MAPPING.OS],
  });

  const ASSIGNEE_DATA = useMemo(
    () => transformAssigneeData(data?.data),
    [data?.data]
  );

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
          placeholder="OS Name"
          selectedValues={filterValues?.osName}
          setSelectedValues={(value) => {
            setFilterValues({
              ...filterValues,
              osName: value,
            });
            filterHandler(value, "osName");
          }}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        <DropdownMultiSelect
          optionData={transManuAOSPData}
          placeholder="AOSP Codename"
          selectedValues={filterValues?.aospCodename}
          setSelectedValues={(value) => {
            setFilterValues({
              ...filterValues,
              aospCodename: value,
            });
            filterHandler(value, "aospCodename");
          }}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        {!isLoading && !isError && (
          <DropdownMultiSelect
            optionData={ASSIGNEE_DATA}
            placeholder="Select Assigee"
            selectedValues={filterValues?.assignee}
            setSelectedValues={(value) => {
              setFilterValues({
                ...filterValues,
                assignee: value,
              });
              filterHandler(value, "assignee");
            }}
            width={200}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        )}

        <DropdownMultiSelect
          optionData={FILTER_VALUES}
          placeholder="Search Status"
          selectedValues={filterValues?.status}
          setSelectedValues={(value) => {
            setFilterValues({
              ...filterValues,
              status: value,
            });
            filterHandler(value, "status");
          }}
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
