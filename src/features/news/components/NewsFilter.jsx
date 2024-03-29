import React from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import { RxCross1 } from "react-icons/rx";
import "./NewsFilter.scss";

import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import {
  FEATURE_MAPPING,
  FILTER_VALUES,
  INFORMATION_TYPE_FILTER,
  INFO_NOTIFICATION,
  PRIMARY_INVENTORY_FILTER,
} from "../../../common/global.constant";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";

const NewsFilter = ({ filterData, filterHandler }) => {
  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [],
    permissionTitle: [
      FEATURE_MAPPING.NEWS,
      FEATURE_MAPPING.VULNERABILITY,
      FEATURE_MAPPING.ALERT,
      FEATURE_MAPPING.ADVISORY,
    ],
  });
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });
  const ASSIGNEE_DATA = transformAssigneeData(data?.data);

  return (
    <div className="news-filter-wrapper">
      <div className="new-search">
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
        {Object.keys(filterData).length > 0 && (
          <div className="clear-chip">
            <button
              onClick={() => filterHandler(filterData, "null")}
              className="clear-all-button"
            >
              <RxCross1 /> Clear All
            </button>
          </div>
        )}
        <div>
          <DropdownMultiSelect
            optionData={INFO_NOTIFICATION}
            placeholder="Notification"
            selectedValues={filterData.info}
            setSelectedValues={(value) =>
              filterHandler(value, "info")
            }
            width={80}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
        <div>
          <DropdownMultiSelect
            optionData={PRIMARY_INVENTORY_FILTER}
            placeholder="Primary Inventory"
            selectedValues={filterData.primaryInventory}
            setSelectedValues={(value) =>
              filterHandler(value, "primaryInventory")
            }
            width={180}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
        {!isLoading && !isError && (
          <div>
            <DropdownMultiSelect
              optionData={ASSIGNEE_DATA}
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
            optionData={INFORMATION_TYPE_FILTER}
            placeholder="All Type"
            selectedValues={filterData.type}
            setSelectedValues={(value) => filterHandler(value, "type")}
            width={180}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
        <div>
          <DropdownMultiSelect
            optionData={FILTER_VALUES}
            placeholder="All Status"
            selectedValues={filterData.status}
            setSelectedValues={(value) => filterHandler(value, "status")}
            width={180}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsFilter;
