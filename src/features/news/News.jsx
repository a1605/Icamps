import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// Components
import { NewsHeader, NewsFilter } from "./components";
import InformationCreateOption from "./components/InformationCreateOption/InformationCreateOption";
import Table from "../../common/components/table/Table";

// Constant
import { GLOBAL_STATUS, KPI_KEY, order } from "../../common/global.constant";
import { INFORMATION_QUERY_KEYS, NEWS_COLUMNS } from "./news.constant";

// Service
import { updateSingleNews } from "./services/newsServices";

// Helper
import { transformIndicatorValue, transformTableData } from "./news.helpers";

// Hooks
import { useFetchKPI } from "./hooks/useFetchKPI";
import useFetchNews from "./hooks";

// CSS
import "../../App.scss";
import { statusChangeOnCancel } from "../../common/helperFunction/statusHelper";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";
import toast from "react-hot-toast";

const News = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const [showOptions, setShowOptions] = useState(false);
  const [filterData, setFilterData] = useState({ searchKeyword: "" });
  const { isLoading, isError, data } = useFetchNews(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const kpiData = useFetchKPI();
  const { auth } = useAuth();
  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);
  const onEdit = (data) => {
    navigate(`/information/edit/${data.type}/${data.informationId}`);
  };

  const onView = (data) => {
    navigate(`/information/view/detail/${data.informationId}`);
  };

  const onDelete = async (data) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Deleted",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const dataValue = { ...data, comments: commentdata, status: GLOBAL_STATUS.DELETED };
    await updateSingleNews(dataValue);
    queryClient.invalidateQueries([
      INFORMATION_QUERY_KEYS.FETCH_INFORMATION,
      page,
      filterData,
    ]);
    queryClient.invalidateQueries(KPI_KEY.NEWS);
    toast.success("Information deleted successfully");
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
    if (value.length > 0) {
      return setFilterData({
        ...filterData,
        [key]: value.map((item) => item.id),
      });
    }

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
    requestedOn
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
    queryClient.invalidateQueries([
      INFORMATION_QUERY_KEYS.FETCH_INFORMATION,
      page,
      filterData,
    ]);
    queryClient.invalidateQueries(KPI_KEY.NEWS);
    toast.success("Information Assignee Updated successfully");
  };
  const transFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.informationResponseListing,
        onEdit,
        onView,
        onDelete,
        handleAssigneeChange,
        onCancelRequest: async (item) => {
          let commentdata = [];
          commentdata.push({
            commentDescription: "Cancel Request",
            email: auth.userDetails.email,
            updatedOn: dateTransform(new Date()),
          });
          await updateSingleNews({
            informationId: item.informationId,
            status: statusChangeOnCancel(item.status),
            requestedOn: null,
            requestedBy: null,
            comments: commentdata,
            approvedBy: item.approvedBy,
            approvedOn: item.approvedOn,
            updatedOn: item.updatedOn,
            updatedBy: item.updatedBy,
            assignee: `${auth.userDetails.email.toLowerCase()}`,
          });

          queryClient.invalidateQueries([
            INFORMATION_QUERY_KEYS.FETCH_INFORMATION,
            page,
            filterData,
          ]);
          queryClient.invalidateQueries(KPI_KEY.NEWS);
        },
        onUnPublish: async (item) => {
          await updateSingleNews({
            informationId: item.informationId,
            status: GLOBAL_STATUS.REQ_UNPUBLISHED,
          });
          toast.success("Information unpublished successfully");

          queryClient.invalidateQueries([
            INFORMATION_QUERY_KEYS.FETCH_INFORMATION,
            page,
            filterData,
          ]);
          queryClient.invalidateQueries(KPI_KEY.NEWS);
        },
      }),
    [isLoading, isError, data?.data?.informationResponseListing]
  );

  return (
    <>
      <div className="page-background ">
        <NewsHeader
          indicatorValues={INDICATOR_VALUES}
          modalStatus={showOptions}
          setModalStatus={setShowOptions}
        />
        <NewsFilter filterData={filterData} filterHandler={handleFilter} />
        {!isError ? (
          <Table
            tableColumns={NEWS_COLUMNS}
            tableData={transFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={15}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
            currentPage={page}
            // setCol={setCol}
          />
        ) : (
          <div>
            <p>Something Went Wrong</p>
          </div>
        )}

        {/* On Click Create Information POPUP Box Component */}
        {showOptions && (
          <InformationCreateOption
            modalStatus={showOptions}
            setModalStatus={setShowOptions}
          />
        )}
      </div>
    </>
  );
};

export default News;
