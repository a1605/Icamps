import React, { useState, useMemo } from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import "./ApprovalDeviceFilter.scss";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";

import { FILTER_VALUES } from "../../approval/approval.constant";
import {
  FEATURE_MAPPING,
  PERMISSION_MAPPING,
} from "../../../common/global.constant";
import { transformAssigneeData } from "../../../common/helperFunction/assigneeDataTransform";

const ApprovalDeviceFilter = ({ filterData, filterHandler }) => {
  const [searchBarValue, setSearchBarValue] = useState("");

  const { data, isLoading, isError } = useFetchAssigneeList({
    permissionName: [PERMISSION_MAPPING.APPROVER],
    permissionTitle: [FEATURE_MAPPING.DEVICES],
  });
  const assigneeData = useMemo(() => {
    if (!isLoading && !isError) return transformAssigneeData(data?.data);
    else return [];
  }, [(isLoading, isError, data?.data)]);

  return (
    <div className="approval-device-filter-wrapper">
      <div className="approval-device-search">
        <SearchBar
          value={searchBarValue}
          onValueChange={(e) => setSearchBarValue(e.target.value)}
        />
      </div>
      <div className="dropdown">
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
          />
        </div>
      </div>
    </div>
  );
};
export default ApprovalDeviceFilter;
