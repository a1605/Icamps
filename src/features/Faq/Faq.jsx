import React, { useState, useMemo, useEffect } from "react";
import { deleteFaq } from "./Services/faqServices";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchFaqList } from "./hooks/useFetchFaqList";
import { useNavigate } from "react-router-dom";
import { transformTableData } from "./faq.helper";
import { order } from "../../common/global.constant";
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import Table from "../../common/components/table/Table";
import { FAQ_COLUMNS, INVENTORY_FAQ_QUERY_KEY } from "./faq.constant";
import { toast } from "react-hot-toast";
import CreateFaq from "./Create/CreateFaq";
const Faq = () => {
  const [page, setPage] = useState(1);
  const [sortingStatus, setSortingStatus] = useState({ questionSequence: 1 });
  const [filterData, setFilterData] = React.useState({ searchKeyword: "" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useFetchFaqList(
    page,
    filterData,
    Object.keys(sortingStatus)[0],
    order(sortingStatus)
  );

  const onEdit = (data) => {
    navigate(`/faq/edit/${data.id}`);
  };

  const onDelete = async (data) => {
    try {
      await deleteFaq(data.id);
      queryClient.invalidateQueries([INVENTORY_FAQ_QUERY_KEY.FAQ_LISTING]);
      toast.success("FAQ Deleted Successfully");
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };

  const onView = (data) => {
    navigate(`/faq/view/${data.id}`);
  };

  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData({
        data: data?.data?.faqResponseDTOS,
        onEdit,
        onDelete,
        onView,
      }),
    [isLoading, isError, data?.data]
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
          iconButtonTitle="Add New"
          pathToNavigate={"/faq/create"}
          title="FAQ"
          permissionTitle="FAQ"
        />

        <div
          className="faqTableContainer"
          style={{ margin: "15px 20px 15px 10px" }}
        >
          {!isError ? (
            <Table
              tableColumns={FAQ_COLUMNS}
              tableData={transformTableFormData}
              paginationCount={data?.data?.pageSize}
              isLoading={isLoading}
              handlePaginationValue={setPage}
              rowCount={10}
              sortingStatus={sortingStatus}
              setSortingStatus={setSortingStatus}
            />
          ) : (
            <div>
              <p>Something Went Wrong</p>
            </div>
          )}

          <CreateFaq />
        </div>
      </div>
    </>
  );
};

export default Faq;
