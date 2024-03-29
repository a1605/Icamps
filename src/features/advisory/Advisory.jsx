import React, { useMemo } from "react";
import Table from "../../common/components/table/Table";
import { AdvisoryFilter } from "./components";
import useFetchAdvisory from "./hooks";
import { ADVISORY_COLUMNS, ADVISORY_QUERY_KEY } from "./advisory.constant";
import {
  transformIndicatorValue,
  transformTableData,
} from "./advisory.helpers";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import { useFetchKPI } from "../news/hooks/useFetchKPI";
import { order } from "../../common/global.constant";
import { updateSingleNews } from "../news/services/newsServices";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";

const Advisory = () => {
  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ requestedOn: 0 });
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  // Calling the Fetch Hook
  const { isLoading, isError, data } = useFetchAdvisory(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const navigate = useNavigate();
  const kpiData = useFetchKPI();

  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  const onView = (data) => {
    navigate(`/information/view/advisory/${data.informationId}`);
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
  const handleAssigneeChange = async (
    email,
    id,
    status,
    approvedBy,
    approvedOn,
    requestedBy,
    requestedOn,
  ) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assignee Changed",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const body = {
      informationId: id,
      assignee: email,
      approvedBy: approvedBy,
      approvedOn: approvedOn,
      requestedBy: requestedBy,
      requestedOn: requestedOn,
      comments: commentdata,
      status:status
    };
    await updateSingleNews(body);
    queryClient.invalidateQueries([ADVISORY_QUERY_KEY.LISTING_KEY, page]);
    toast.success(`Information Advisory assignee updated successfully`);
  };

  const transFormData = useMemo(() => {
    if (!isLoading && !isError)
      return transformTableData({
        data: data?.data?.informationResponseListing,
        onView,
        handleAssigneeChange,
      });
    else return [];
  }, [isLoading, isError, data?.data?.informationResponseListing]);

  return (
    <div className="page-background ">
      <ListingHeader
        title="Request Advise - Information"
        indicatorValues={INDICATOR_VALUES}
      />
      <AdvisoryFilter filterData={filterData} filterHandler={handleFilter} />
      {!isError ? (
        <Table
          tableColumns={ADVISORY_COLUMNS}
          tableData={transFormData}
          paginationCount={data?.data?.pageSize}
          isLoading={isLoading}
          handlePaginationValue={setPage}
          rowCount={15}
          sortingStatus={sortingStatus}
          setSortingStatus={setSortingStatus}
        />
      ) : (
        <div>
          <p>Something Went Wrong</p>
        </div>
      )}
    </div>
  );
};

export default Advisory;
