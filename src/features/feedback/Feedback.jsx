import React, { useMemo, useState } from "react";

import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import Table from "../../common/components/table/Table";
import { useFetchFeedback } from "./hooks/useFetchFeedback";
import { FEEDBACK_COLUMNS } from "./feedback.constant";
import { transformTableData } from "./feedback-helper";
import { useNavigate, useParams } from "react-router-dom";
import ViewFeedback from "./ViewFeedback/ViewFeedback";

const Feedback = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { id, pageType } = useParams();

  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });

  const { data, isLoading, isError } = useFetchFeedback(page);
  const transformTableFormData = useMemo(
    () =>
      !isLoading &&
      !isError &&
      transformTableData(data?.data?.feedbackResponseDTOS, (item) => {
        navigate("/inventory/feedback/create/" + item.feedbackId);
      }),
    [isLoading, isError, data?.data?.feedbackResponseDTOS]
  );
  return (
    <>
      <div className="page-background ">
        <ListingHeader title="Feedbacks" />
        {!isError && (
          <Table
            tableColumns={FEEDBACK_COLUMNS}
            tableData={transformTableFormData}
            paginationCount={data?.data?.pageSize}
            isLoading={isLoading}
            handlePaginationValue={setPage}
            rowCount={15}
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
            currentPage={page}
          />
        )}
        {pageType !== undefined && id !== undefined && <ViewFeedback />}
      </div>
    </>
  );
};

export default Feedback;
