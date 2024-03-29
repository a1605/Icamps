import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import "./AppsFilter.scss";
import {
  ADVISOR_FILTER,
  APPROAVAL_FILTER,
  FEATURE_MAPPING,
  FILTER_VALUES,
  GLOBAL_STATUS,
  SCREEN_TYPE,
} from "../../../common/global.constant";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";
import { useFetchAppWithStatus } from "../hooks/useFetchApps";
import { transformAppNameData } from "../application.helper";
import { useFetchAllApps } from "../hooks/useFetchAllApps";
import { APP_TYPE_DATA } from "../app.constant";

const AppsFilter = ({
  filterData,
  setFilterData,
  screenType,
  filterHandler,
}) => {
  const [deviceValue, setdeviceValue] = useState([]);
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });

  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [],
    permissionTitle: [FEATURE_MAPPING.NEWS],
  });

  const appList =
    screenType === SCREEN_TYPE.APPROVAL || screenType === SCREEN_TYPE.ADVISOR
      ? useFetchAppWithStatus(1, { pagination: false }, [
          GLOBAL_STATUS.SUBMITTED,
          GLOBAL_STATUS.REQ_UNPUBLISHED,
        ])
      : useFetchAllApps();

  const transAppList = useMemo(
    () =>
      screenType === SCREEN_TYPE.APPROVAL || screenType === SCREEN_TYPE.ADVISOR
        ? !appList.isLoading && !appList.isError
          ? transformAppNameData(appList.data?.data?.applicationResponseList)
          : []
        : transformAppNameData(appList.data?.data),
    [
      appList.isLoading,
      appList.isError,
      appList.data?.data?.applicationResponseList,
    ]
  );
  const ASSIGNEE_DATA = transformAssigneeData(data?.data);

  return (
    <div className="apps-filter-wrapper">
      <div className="app-search">
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
      <div className="apps-dropdown">
        <DropdownMultiSelect
          optionData={APP_TYPE_DATA}
          placeholder="Select App Type"
          selectedValues={filterData?.appTypes}
          setSelectedValues={(value) => {
            filterHandler(value, "appTypes")}}
          showChips={false}
          // multiple={false}
          searchable={true}
        />
        <DropdownMultiSelect
          optionData={transAppList}
          placeholder="All App"
          selectedValues={deviceValue}
          setSelectedValues={(value) => {
            setdeviceValue(value);
            filterHandler(value, "applicationNames");
          }}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        {!isLoading && !isError && (
          <DropdownMultiSelect
            optionData={ASSIGNEE_DATA}
            placeholder="Select Assignee"
            selectedValues={filterData?.assignee}
            setSelectedValues={(value) => filterHandler(value, "assignee")}
            width={200}
            showChips={false}
            disableCloseOnSelect={true}
            // multiple={false}
            searchable={true}
          />
        )}

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

export default AppsFilter;
