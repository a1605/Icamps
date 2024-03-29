import React from "react";
import "./SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  value,
  onValueChange,
  onKeyDown,
  placeholder = "Search",
  clickHandler,
}) => {
  return (
    <div className="searchbar-wrapper">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onValueChange}
          onKeyUp={onKeyDown}
        />
      </form>
      <SearchIcon color="inherit" onClick={clickHandler} />
    </div>
  );
};

export default SearchBar;
