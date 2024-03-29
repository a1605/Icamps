import React, { useMemo, useState } from "react";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { transformTableData } from "./network-helper";
import { INVENTORY_QUERY_KEY, NETWORK_COLUMNS } from "./network.constant";
import { useFetchNetwork } from "./hooks/useFetchNetwork";
import Table from "../../common/components/table/Table";
import { updateSingleNetwork } from "./network-service";
import { GLOBAL_STATUS, order } from "../../common/global.constant";
import NetworkFilter from "./Create/NetworkFilter";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";

const Network = () => {
  const [page, setPage] = useState(1);
  const { auth } = useAuth();

  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });
  const { isLoading, isError, data } = useFetchNetwork(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleFilter = (value, key) => {
    setPage(1);
    if (key === "searchKeyword") {
      return setFilterData({
        ...filterData,
        searchKeyword: value,
      });
    }
    if (value.length > 0)
      return setFilterData({
        ...filterData,
        [key]: value.map((item) => item.id),
      });
    const { [key]: keyData, ...data } = filterData;
    setFilterData(data);
  };

  const onEdit = (data) => {
    navigate(`/inventory/network/edit/${data.networkId}`);
  };

  const onView = (data) => {
    navigate(`/inventory/network/view/${data.networkId}`);
  };

  const onDelete = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Deleted",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const dataValue = {
      ...data,
      comments: commentdata,
      status: GLOBAL_STATUS.DELETED,
    };
    try {
      await updateSingleNetwork(dataValue);
      queryClient.invalidateQueries([
        INVENTORY_QUERY_KEY.NETWORK_NUMBER_LISTING,
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
        data: data?.data?.networkResponseDTOS,
        onEdit,
        onView,
        onDelete,
      }),
    [isLoading, isError, data?.data?.networkResponseDTOS]
  );
  return (
    <>
      <div className="page-background ">
        <ListingHeader
          iconButtonTitle="Add"
          pathToNavigate={"/inventory/network/create"}
          permissionTitle="network"
          title="Network"
          bulkUploadTitle="Bulk Upload"
          bulkNavigate="/bulk-upload/network"
        />
        <NetworkFilter filterHandler={handleFilter} filterData={filterData} />
        {!isError ? (
          <Table
            tableColumns={NETWORK_COLUMNS}
            tableData={transformTableFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={15}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
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

export default Network;
