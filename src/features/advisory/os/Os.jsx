import React, { useMemo, useState } from "react";
import Table from "../../../common/components/table/Table";
import { OsFilter } from "./components";
import { ANALYST_OS_COLUMNS, OS_QUERY_KEY } from "../../os/os.constant";
import { useFetchOs } from "./hooks/useFetchOs";
import { useNavigate } from "react-router-dom";
import { transformIndicatorValue, transformTableData } from "./os.helper";
import ListingHeader from "../../../common/components/ListingHeader/ListingHeader";
import { useFetchKPI } from "../../os/hooks/useFetchKPI";
import "../../../App.scss";
import { order } from "../../../common/global.constant";
import { ADVISORY_QUERY_OS_KEY } from "../advisory.constant";
import { updateSingleOS } from "../../os/services/OS.Services";
import { useQueryClient } from "@tanstack/react-query";
import { ADVISOR_OS_QUERY_KEY } from "../../approvalOs/approvalOs.constant";
import { updateSingleApprovalOs } from "../../approvalOs/services/approvalOsServices";
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import { useAuth } from "../../../common/hooks/useAuth";

const Os = () => {
  const navigate = useNavigate();
  const { auth} = useAuth();

  const [page, setPage] = React.useState(1);
  const [sortingStatus, setSortingStatus] = React.useState({ updatedOn: 0 });
  const [filterData, setFilterData] = useState({ searchKeyword: "" });
  const { data, isLoading, isError } = useFetchOs(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus),
    true
  );

  const kpiData = useFetchKPI();
  const queryClient = useQueryClient();

  const INDICATOR_VALUES = transformIndicatorValue(kpiData?.data?.data);

  const onView = (data) => {
    navigate("/advisor/os/view/" + data.osId);
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
  const handleAssigneeChange = async (email, id,status) => {
    let commentdata = [];
    commentdata.push({
      commentDescription: "Assignee Changed",
      email: auth.userDetails.email,
      updatedOn: dateTransform(new Date()),
    });
    const body = {
      osId: id,
      assignee: email,
      comments:commentdata,
      status:status
    };
    await updateSingleApprovalOs(body);
    queryClient.invalidateQueries([OS_QUERY_KEY.LISTING_KEY, page, filterData]);
    toast.success(`OS Advisory assignee updated successfully`);
  };

  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.osresponseDto,
        onView,
        handleAssigneeChange,
      }),
    [isLoading, isError, data?.data?.osresponseDto]
  );

  return (
    <>
      <div className="page-background ">
        <ListingHeader
          pathToNavigate={"/inventory/os/create-os"}
          title="Request Advice - OS"
          indicatorValues={INDICATOR_VALUES}
        />
        <OsFilter filterData={filterData} filterHandler={handleFilter} />
        {!isError ? (
          <Table
            tableColumns={ANALYST_OS_COLUMNS}
            tableData={transformTableFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={15}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
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
