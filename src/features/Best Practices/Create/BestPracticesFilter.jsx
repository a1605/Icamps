import React from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import "./BestPracticesFilter.scss";
const BestPracticesFilter = ({ filterHandler, filterData }) => {
  const [filterValues, setFilterValues] = React.useState({
    searchKeyword: "",
  });
  return (
    <div className="bestPractise-filter-wrapper">
      <div className="bestPractise-search">
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

export default BestPracticesFilter;
