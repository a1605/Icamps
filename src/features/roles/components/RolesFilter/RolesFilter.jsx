import React, { useState } from "react";
import SearchBar from "../../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import "./RolesFilter.scss";

const RolesFilter = ({ filterValues, filterData, filterHandler }) => {
  const [searchBarValue, setSearchBarValue] = useState("");

  return (
    <div className="roles-filter-wrapper">
      <div className="dropdown">
        <label>Roles</label>
        <DropdownMultiSelect
          optionData={filterValues}
          placeholder={"Search Role"}
          selectedValues={filterData.roleNames}
          setSelectedValues={(value) => filterHandler(value, "roleNames")}
          width={220}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
      </div>
    </div>
  );
};

export default RolesFilter;
