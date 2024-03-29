import React, { useEffect, useState } from "react";
import "./Table.scss";
import TablePagination from "../tablePagination/TablePagination";
import { AiFillCaretDown } from "react-icons/ai";
import { TableSkeleton } from "../tableSkeleton/TableSkeleton";
import { useLocation } from "react-router-dom";

const Table = ({
  tableColumns = [],
  tableData = [],
  paginationCount = 0,
  handlePaginationValue,
  sortingStatus,
  setSortingStatus,
  isLoading = false,
  rowCount = 15,
  tableBodyClassname = "",
  currentPage,
}) => {
  const location = useLocation();
  const heightDiff = () => {
    switch (location.pathname) {
      case "/roles":
        return 230;
      case "/issues-action/issues":
      case "/issues-action/action":
        return 280;
      case "/miscellaneous/gpu":
      case "/miscellaneous/permission":
      case "/miscellaneous/manufacturer":
      case "/miscellaneous/libraries":
      case "/miscellaneous/publisher":
      case "/miscellaneous/cpu":
        return 243;
      case "/inventory/feedback":
        return 158;
      default:
        return 225;
    }
  };
  const [height, setHeight] = useState(window.innerHeight - heightDiff());

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - heightDiff());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderHeader = (item, index) => {
    const flag = item.sorting; // && Object.keys(sortingStatus)[0] === item.key;
    return (
      <th
        key={index}
        {...(flag
          ? {
              onClick: () =>
                setSortingStatus({
                  [item.key]: sortingStatus[item.key]
                    ? -1 * parseInt(sortingStatus[item.key])
                    : 1,
                }),
            }
          : {})}
        {...(flag ? { className: "sorting-column" } : {})}
        {...(flag && sortingStatus[item.key] === 1
          ? {
              className: `sorting-column down`,
            }
          : {})}
        {...(flag && sortingStatus[item.key] === -1
          ? {
              className: `sorting-column up`,
            }
          : {})}
        style={{
          minWidth: item.minWidth,
          maxWidth: item.maxWidth,
          width: item.width,
        }}
      >
        {item.header}
        &nbsp;&nbsp;
        {flag && Object.keys(sortingStatus)[0] === item.key && (
          <AiFillCaretDown />
        )}
      </th>
    );
  };

  return (
    <div
      className="table-wrapper"
      style={{
        height: height,
      }}
    >
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {tableColumns.map((item, index) => renderHeader(item, index))}
            </tr>
          </thead>
          {!isLoading ? (
            <tbody className={tableBodyClassname}>
              {tableData?.length > 0 ? (
                tableData.map((item, index) => (
                  <tr key={index}>
                    {tableColumns.map((values, i) => (
                      <td key={`${index} ${i}`}>
                        {typeof item[values.key] === "string" &&
                        item[values.key].length > 50
                          ? `${item[values.key].slice(0, 50)}...`
                          : item[values.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="no-records" colSpan={tableColumns.length}>
                    No Records Found.
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <TableSkeleton rowCount={rowCount} colCount={tableColumns.length} />
          )}
        </table>
      </div>

      {paginationCount ? (
        <div className="table-paginaion">
          <TablePagination
            paginationCount={paginationCount}
            handlePaginationValue={handlePaginationValue}
            currentPage={currentPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
