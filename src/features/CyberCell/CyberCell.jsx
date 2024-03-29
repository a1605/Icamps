import React, { useMemo, useState } from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import { CYBER_CELL_COLUMNS, INVENTORY_QUERY_KEY } from "./cyber-cell.constant";
import { transformTableData } from "./cyber-cell-helper";
import { updateSingleCyberCell } from "./services/cyber-cell-service";
import { useFetchCyberCell } from "./hooks/useFetchCyberCell";
import { GLOBAL_STATUS, order } from "../../common/global.constant";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Table from "../../common/components/table/Table";
import CyberCellFilter from "./CyberCellFilter";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";

const CyberCell = () => {
  const [page, setPage] = useState(1);
  const { auth } = useAuth();

  const [filterData, setFilterData] = useState({ searchKeyword: "" });
  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const { isLoading, isError, data } = useFetchCyberCell(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onEdit = (data) => {
    navigate(`/inventory/cyber-security/edit/${data.cyberCellId}`);
  };

  const onView = (data) => {
    navigate(`/inventory/cyber-security/view/${data.cyberCellId}`);
  };
  const handleFilter = (value, key) => {
    setPage(1);
    if (key === "searchKeyword") {
      setFilterData({
        ...filterData,
        searchKeyword: value,
      });
      return;
    }
    if (value.length > 0)
      return setFilterData({
        ...filterData,
        [key]: value.map((item) => item.id),
      });
    const { [key]: keyData, ...data } = filterData;
    setFilterData(data);
  };
  const onDelete = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Deleted",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const dataValue = { ...data, comments: commentdata, status: GLOBAL_STATUS.DELETED };
    try {
      await updateSingleCyberCell(dataValue);
      queryClient.invalidateQueries([
        INVENTORY_QUERY_KEY.CYBERCELL_NUMBER_LISTING,
      ]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };
  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.cyberCellResponseDTOS,
        onEdit,
        onView,
        onDelete,
      }),
    [isLoading, isError, data?.data?.cyberCellResponseDTOS]
  );

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          iconButtonTitle="Add"
          pathToNavigate={"/inventory/cyber-security/create"}
          permissionTitle="cyber cell"
          title="Cyber Security"
          bulkUploadTitle="Bulk Upload"
          bulkNavigate="/bulk-upload/cyber-security"
        />
        <CyberCellFilter filterData={filterData} filterHandler={handleFilter} />
        {!isError ? (
          <Table
            tableColumns={CYBER_CELL_COLUMNS}
            tableData={transformTableFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={15}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
            filterData={filterData}
            filterHandler={handleFilter}
            currentPage={page}
          />
        ) : (
          <div style={{ marginLeft: "30px", marginTop: "20px" }}>
            <p>Something Went Wrong</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CyberCell;
