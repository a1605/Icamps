import React, { useMemo } from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import { RxCross1 } from "react-icons/rx";
import "./AdvisoryFilter.scss";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";
import {
  ADVISOR_FILTER,
  FEATURE_MAPPING,
  INFORMATION_TYPE_FILTER,
  INFO_NOTIFICATION,
  PERMISSION_MAPPING,
  PRIMARY_INVENTORY_FILTER,
} from "../../../common/global.constant";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";

const AdvisoryFilter = ({ filterData, filterHandler }) => {
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });

  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [PERMISSION_MAPPING.ADVISOR],
    permissionTitle: [FEATURE_MAPPING.NEWS],
  });

  const assigneeData = useMemo(() => {
    if (!isLoading && !isError) return transformAssigneeData(data?.data);
    else return [];
  }, [(isLoading, isError, data?.data)]);

  return (
    <div className="advisory-filter-wrapper">
      <div className="advisory-search">
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
        <div className="clear-chip">
          <button onClick={filterHandler} className="clear-all-button">
            <RxCross1 /> Clear All
          </button>
        </div>
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
            width={200}
            disableCloseOnSelect={true}
            showChips={false}
            searchable={true}
          />
        </div>
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
            optionData={INFORMATION_TYPE_FILTER}
            placeholder="All Type"
            selectedValues={filterData.type}
            setSelectedValues={(value) => filterHandler(value, "type")}
            width={200}
            showChips={false}
            disableCloseOnSelect={true}
            searchable={true}
          />
        </div>
        <div>
          <DropdownMultiSelect
            optionData={ADVISOR_FILTER}
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
export default AdvisoryFilter;
