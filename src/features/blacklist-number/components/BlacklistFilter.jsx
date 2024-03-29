import React, { useState, useMemo } from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import { useFetchblacklistingFilter } from "../hooks/useFetchblacklistingFilter";
import "../components/BlacklistFilter.scss";
import {
  BlacklistDetails,
  transformManuSourceData,
} from "../blacklist-number-helper";
import {
  ADVISOR_FILTER,
  APPROAVAL_FILTER,
  FEATURE_MAPPING,
  FILTER_VALUES,
} from "../../../common/global.constant";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";

const BlacklistFilter = ({ screenType, filterHandler, filterData }) => {
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });
  const blacklistFilter = useFetchblacklistingFilter();
  const transManuSourcesData = useMemo(
    () =>
      !blacklistFilter.isLoading && !blacklistFilter.isError
        ? transformManuSourceData(blacklistFilter?.data?.data)
        : [],
    [
      blacklistFilter.isError,
      blacklistFilter.isLoading,
      blacklistFilter?.data?.data,
    ]
  );

  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [],
    permissionTitle: [FEATURE_MAPPING.NEWS],
  });

  const ASSIGNEE_DATA = transformAssigneeData(data?.data);

  return (
    <div className="blacklist-filter-wrapper">
      <div className="blacklist-search">
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
      <div className="blacklist-dropdown">
        <DropdownMultiSelect
          optionData={BlacklistDetails}
          placeholder="All MobFraudCat"
          selectedValues={filterData?.fraudCategory}
          setSelectedValues={(value) => filterHandler(value, "fraudCategory")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />

        {!isError && !isLoading && (
          <div className="blacklist-dropdown">
            <DropdownMultiSelect
              optionData={ASSIGNEE_DATA}
              placeholder="Select Assignee"
              selectedValues={filterData?.assignee}
              setSelectedValues={(value) => filterHandler(value, "assignee")}
              width={200}
              showChips={false}
              disableCloseOnSelect={true}
              searchable={true}
            />
          </div>
        )}
        <div className="blacklist-dropdown">
          <DropdownMultiSelect
            optionData={transManuSourcesData}
            placeholder="All Sources"
            selectedValues={filterData?.sources}
            setSelectedValues={(value) => filterHandler(value, "sources")}
            width={200}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
        <div className="status-dropdown">
          <DropdownMultiSelect
            optionData={
              (screenType === "approval" && APPROAVAL_FILTER) ||
              (screenType === "advisor" && ADVISOR_FILTER) ||
              (screenType === undefined && FILTER_VALUES)
            }
            placeholder="All Status"
            selectedValues={filterData?.status}
            setSelectedValues={(value) => filterHandler(value, "status")}
            width={200}
            showChips={false}
            multiple={true}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BlacklistFilter;
