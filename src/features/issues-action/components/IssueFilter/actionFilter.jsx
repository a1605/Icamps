import React, { useState } from "react";
import SearchBar from "../../../../common/components/searchBar/SearchBar";
import "./IssueFilter.scss";

const ActionFilter = ({ filterHandler }) => {
  const [filterValues, setFilterValues] = useState({
    searchKeyword: "",
  });
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
    </div>
  );
};

export default ActionFilter;
