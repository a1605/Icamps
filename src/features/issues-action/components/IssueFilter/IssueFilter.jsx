import React, { useState } from "react";
import SearchBar from "../../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import "./IssueFilter.scss";
import { PRIMARY_INVENTORY_FILTER } from "../../../../common/global.constant";

const IssueFilter = ({ filterHandler }) => {
  const [issueTypeFilter, setIssueTypeFilter] = useState([]);
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });
  return (
    <div className="news-filter-wrapper">
      <div className="new-search">
        <SearchBar
          value={filterValues.searchKeyword}
          name
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
        <div>
          <DropdownMultiSelect
            optionData={PRIMARY_INVENTORY_FILTER}
            placeholder="Issue Type"
            selectedValues={issueTypeFilter}
            setSelectedValues={(value) => {
              setIssueTypeFilter(value);
              filterHandler(value, "issueType");
            }}
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

export default IssueFilter;
