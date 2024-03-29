import React, { useState } from "react";
import "./Users.scss";
import { UsersFilter, UsersHeader } from "./components/index";
import { USERS_COLUMNS } from "./users.constant";
import Table from "../../common/components/table/Table";
import { transformUsersData } from "./users.helper";
import { useFetchUsers } from "./hooks/index";
import { order } from "../../common/global.constant";

const Users = () => {
  const [sortingStatus, setSortingStatus] = useState({ firstName: 1 });
  const [filterData, setFilterData] = useState({
    roles: [],
    status: "",
    pagination: true,
    searchKeyword: "",
  });
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useFetchUsers(
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    page,
    filterData
  );

  const handleFilter = (value, key) => {
    setPage(1);
    if (key === "searchKeyword") {
      setFilterData({
        ...filterData,
        status: "",
        roles: [],
        searchKeyword: value,
      });
    } else if (key === "status") {
      const { searchKeyword, ...data } = filterData;
      if (value.label === "All") {
        setFilterData({
          ...data,
          status: "",
        });
      } else {
        setFilterData({
          ...data,
          [key]: value.label === "Active" ? true : false,
        });
      }
    } else if (key === "roles") {
      setFilterData({
        ...filterData,
        roles: value?.map((item) => item?.label),
      });
    }
  };

  return (
    <div className="page-background">
      <UsersHeader />
      <UsersFilter filterData={filterData} filterHandler={handleFilter} />
      {!isError ? (
        <Table
          tableColumns={USERS_COLUMNS}
          tableData={transformUsersData(data?.data?.responseDTOList)}
          paginationCount={data?.data?.pageSize}
          isLoading={isLoading}
          handlePaginationValue={setPage}
          rowCount={15}
          sortingStatus={sortingStatus}
          setSortingStatus={setSortingStatus}
          currentPage={page}
        />
      ) : (
        <div>
          <p>Something Went Wrong</p>
        </div>
      )}
    </div>
  );
};

export default Users;
