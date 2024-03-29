import React, { useState, useMemo } from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";

import { transformTableData } from "./fraud.helper";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Table from "../../common/components/table/Table";
import { GLOBAL_STATUS, order } from "../../common/global.constant";
import { updateSingleFraud } from "./Services/fraudServices";
import { toast } from "react-hot-toast";
import FraudFilter from "./Create/FraudFilter";
import { useFetchFraudList } from "./hooks/useFetchfraudList";
import { FRAUD_COLUMNS, INVENTORY_FRAUD_QUERY_KEY } from "./fraud.constant";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";

const Fraud = () => {
  const [page, setPage] = useState(1);
  const { auth } = useAuth();

  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useFetchFraudList(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );
  const onEdit = (data) => {
    navigate(`/inventory/fraud/edit/${data.fraudId}`);
  };
  const onView = (data) => {
    navigate(`/inventory/fraud/view/${data.fraudId}`);
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
      await updateSingleFraud(dataValue);
      queryClient.invalidateQueries([
        INVENTORY_FRAUD_QUERY_KEY.FRAUD_LISTING
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
        data: data?.data?.fraudResponseDTOList,
        onView,
        onEdit,
        onDelete,
      }),
    [isLoading, isError, data?.data?.fraudResponseDTOList]
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
          pathToNavigate={"/inventory/fraud/create"}
          title="Fraud"
          permissionTitle="fraud"
        />
        <FraudFilter filterHandler={handleFilter} filterData={filterData} />
        {!isError ? (
          <Table
            tableColumns={FRAUD_COLUMNS}
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

export default Fraud;
