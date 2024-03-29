import React, { useState, useMemo } from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import BestPracticesFilter from "./Create/BestPracticesFilter";
import {
  BEST_PRACTICES_COLUMNS,
  INVENTORY_BEST_QUERY_KEY,
} from "./best-practices.constant";
import { transformTableData } from "./best-practise.helper";
import { useFetchBestPracticesList } from "./hooks/useFetchBestPracticesList";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Table from "../../common/components/table/Table";
import { GLOBAL_STATUS, order } from "../../common/global.constant";
import { updateSingleBestPractice } from "./Services/best-practicesServices";
import { toast } from "react-hot-toast";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";

const BestPractices = () => {
  const [page, setPage] = useState(1);
  const { auth } = useAuth();

  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useFetchBestPracticesList(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );
  const onEdit = (data) => {
    navigate(`/inventory/best-practice/edit/${data.bestPracticeId}`);
  };
  const onView = (data) => {
    navigate(`/inventory/best-practice/view/${data.bestPracticeId}`);
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
      await updateSingleBestPractice(dataValue);
      queryClient.invalidateQueries([
        INVENTORY_BEST_QUERY_KEY.BEST_PRACTICES_LISTING,
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
        data: data?.data?.bestPracticeResponseList,
        onView,
        onEdit,
        onDelete,
      }),
    [isLoading, isError, data?.data?.bestPracticeResponseList]
  );
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
  return (
    <>
      <div className="page-background ">
        <ListingHeader
          iconButtonTitle="Add"
          pathToNavigate={"/inventory/best-practice/create"}
          title="Best Practices"
          permissionTitle="best practices"
        />
        <BestPracticesFilter
          filterHandler={handleFilter}
          filterData={filterData}
        />
        {!isError ? (
          <Table
            tableColumns={BEST_PRACTICES_COLUMNS}
            tableData={transformTableFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={10}
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
    </>
  );
};

export default BestPractices;
