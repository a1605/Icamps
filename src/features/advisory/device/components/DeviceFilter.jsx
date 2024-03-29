import React, { useMemo, useState } from "react";
import SearchBar from "../../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import "./DeviceFilter.scss";
import { FILTER_VALUES } from "../../../../common/global.constant";

const DeviceFilter = ({ handleFilter, filterData }) => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const handleSearchBarValueChange = (event) => {
    setSearchBarValue([event.target.value]);
  };

  return (
    <div className="device-filter-wrapper">
      <div className="device-search">
        <SearchBar
          value={searchBarValue}
          onValueChange={handleSearchBarValueChange}
        />
      </div>
      <div className="dropdown">
        <DropdownMultiSelect
          optionData={FILTER_VALUES.slice(4, -3)}
          placeholder="Select Status"
          selectedValues={filterData.status}
          setSelectedValues={(value) => handleFilter(value, "status")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
        />
      </div>
    </div>
  );
};

export default DeviceFilter;
