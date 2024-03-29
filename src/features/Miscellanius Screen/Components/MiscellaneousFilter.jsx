import React from "react";
import SearchBar from "../../../common/components/searchBar/SearchBar";
import "./MiscellaneousFilter.scss";
const MiscellaneousFilter = ({ filterHandler }) => {
  return (
    <div className="miscellaneous-filter-wrapper">
      <div className="miscellaneous-search">
        <SearchBar value={""} onValueChange={filterHandler} />
      </div>
    </div>
  );
};

export default MiscellaneousFilter;
