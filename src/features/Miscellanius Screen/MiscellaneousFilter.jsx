import { useState } from "react";
import SearchBar from "../../common/components/searchBar/SearchBar";
import "./MiscellaneousFilter.scss";
function MiscellaneousFilter({ filterValues,setFilterValues, filterHandler }) {

  return (
    <div className="miscellaneous-filter-wrapper">
      <div className="miscellaneous-search">
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
}

export default MiscellaneousFilter;
