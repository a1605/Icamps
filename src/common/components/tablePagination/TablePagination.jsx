import React from "react";
import Pagination from "@mui/material/Pagination";
import "./TablePagination.scss";

const TablePagination = ({
  paginationCount,
  handlePaginationValue,
  currentPage,
}) => {
  const handleChange = (event, value) => {
    handlePaginationValue(value);
  };

  return (
    <div className="pagination-wrapper">
      <Pagination
        count={paginationCount}
        siblingCount={1}
        shape="rounded"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

export default TablePagination;
