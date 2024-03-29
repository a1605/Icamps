import React, { useMemo, useState } from "react";
import Table from "../../common/components/table/Table";
import { OsFilter } from "./components";
import { OS_COLUMNS, OS_QUERY_KEY } from "./os.constant";
import { useFetchOs } from "./hooks/useFetchOs";
import { deleteSingleOS, updateSingleOS } from "./services/OS.Services";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { transformIndicatorValue, transformTableData } from "./os.helper";
import { GLOBAL_STATUS, KPI_KEY, order } from "../../common/global.constant";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import "../../App.scss";
import { useFetchKPI } from "./hooks/useFetchKPI";
import { useAuth } from "../../common/hooks/useAuth";
import { dateTransform } from "../../common/helperFunction/dateTransform";

const Os = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ updatedOn: 0 });
  const [filterData, setFilterData] = useState({
    searchKeyword: "",
  });
  const { data, isLoading, isError } = useFetchOs(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    true
  );
  const { auth } = useAuth();
  const kpiData = useFetchKPI();
  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  const onEdit = (data) => {
    navigate(`/inventory/os/edit/${data.osId}`);
  };

  const onView = (data) => {
    navigate("/inventory/os/view/" + data.osId);
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
      await updateSingleOS(dataValue);
      queryClient.invalidateQueries([OS_QUERY_KEY.LISTING_KEY, page]);
      queryClient.invalidateQueries(KPI_KEY.OS);
      toast.success(`${data.osName} deleted successfully`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
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

  const handleAssigneeChange = async (email, id, status) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assignee Changed",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const body = {
      osId: id,
      assignee: email,
      comments: commentdata,
      status: status,
    };
    await updateSingleOS(body);
    queryClient.invalidateQueries([OS_QUERY_KEY.LISTING_KEY, page]);
    queryClient.invalidateQueries(KPI_KEY.OS);
    toast.success(` OS assignee updated successfully`);
  };

  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.osresponseDto,
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
          await updateSingleOS({
            ...item,
            status: GLOBAL_STATUS.DRAFT,
            comments: commentdata,
            requestedOn: null,
            requestedBy: null,
            assignee: `${auth.userDetails.email.toLowerCase()}`,
          });
          queryClient.invalidateQueries([OS_QUERY_KEY.LISTING_KEY, page]);
          queryClient.invalidateQueries(KPI_KEY.OS);
          toast.success(`${item.osName} cancelled successfully`);
        },
      }),
    [isLoading, isError, data?.data?.osresponseDto]
  );

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          indicatorValues={INDICATOR_VALUES}
          title="OS"
          iconButtonTitle="Add"
          pathToNavigate="/inventory/os/create"
          permissionTitle="os"
          bulkUploadTitle="Bulk Upload"
          bulkNavigate="/bulk-upload/os"
        />
        <OsFilter
          tableColumns={OS_COLUMNS}
          filterData={filterData}
          filterHandler={handleFilter}
          searchShow={false}
        />
        {!isError ? (
          <Table
            tableColumns={OS_COLUMNS}
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

export default Os;
