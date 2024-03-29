import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Component Import
import ListingHeader from "../../common/components/ListingHeader/ListingHeader";
import Table from "../../common/components/table/Table";
import { useGetIssues } from "./hooks/useGetIssues";
import {
  TABLE_COLUMNS,
  ISSUE_QUERY_KEY,
  ACTION_TABLE_COLUMN,
} from "./issuesAction.constant";
import {
  transformActionList,
  transformListingData,
} from "./issuesAction.helper";
import CreateEditIssues from "./CreateEditIssues/CreateEditIssues";

// Hooks
import { useGetAction } from "./hooks/useGetAction";

// Constant
import { order } from "../../common/global.constant";

// Service Function
import {
  deleteSingleAction,
  deleteSingleIssue,
} from "./services/issuesServices";

// CSS Import
import "./IssuesAction.scss";
import IssueFilter from "./components/IssueFilter/IssueFilter";
import ActionFilter from "./components/IssueFilter/actionFilter";

const IssuesAction = () => {
  const [page, setPage] = useState(1);
  const [pageAction, setPageAction] = useState(1);
  const [sortingStatus, setSortingStatus] = useState({ updatedOn: 0 });
  const [filterData, setFilterData] = useState({
    issueType: [],
    pagination: true,
    searchKeyword: "",
  });
  const [filterDataAction, setFilterDataAction] = useState({
    searchKeyword: "",
  });

  const { screenType } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, ...issueError } = useGetIssues(
    filterData,
    order(sortingStatus),
    Object.keys(sortingStatus)[0],
    page
  );

  // Get Action list
  const actionData = useGetAction(
    filterDataAction,
    order(sortingStatus),
    Object.keys(sortingStatus)[0],
    pageAction
  );

  useEffect(() => {
    if (!(screenType === "issues" || screenType === "action")) {
      navigate("/error-404");
    }
    if (issueError?.error?.response?.status === 404) {
      navigate("/error-404");
    }
    if (actionData?.error?.response?.status === 404) {
      navigate("/error-404");
    }
  }, [screenType, issueError, actionData?.error]);
  const onEdit = (item) => {
    navigate("/issues-action/issues/edit/" + item.issueId);
  };

  const onView = (item) => {
    navigate("/issues-action/issues/view/" + item.issueId);
  };

  const onDelete = async (item) => {
    try {
      await deleteSingleIssue(item.issueId);
      queryClient.invalidateQueries([
        ISSUE_QUERY_KEY.GET_ISSUE_LIST,
        page,
        filterData,
        order(sortingStatus),
        Object.keys(sortingStatus)[0],
      ]);
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };

  const onDeleteAction = async (item) => {
    try {
      await deleteSingleAction(item.actionId);
      queryClient.invalidateQueries(
        ISSUE_QUERY_KEY.GET_ACTION_LIST,
        filterDataAction,
        pageAction,
        order(sortingStatus),
        Object.keys(sortingStatus)[0]
      );
    } catch (error) {
      toast.error(JSON.parse(error.request.response)?.message);
    }
  };

  const transData = useMemo(
    () =>
      transformListingData(data?.data?.responseList, onEdit, onView, onDelete),
    [data?.data?.responseList]
  );

  const transActionData = useMemo(
    () =>
      transformActionList(
        actionData?.data?.data?.actionResponseDto,
        (item) => navigate("/issues-action/action/edit/" + item.actionId),
        (item) => navigate("/issues-action/action/view/" + item.actionId),
        onDeleteAction
      ),
    [actionData?.data?.data?.actionResponseDto]
  );

  const handleFilter = (value, title) => {
    if (title === "searchKeyword") {
      setFilterData({
        ...filterData,
        searchKeyword: value,
      });
      return;
    }
    setFilterData({
      ...filterData,
      [title]: value.map((item) => item.id),
    });
    setPage(1);
  };

  const handleFilterAction = (value, title) => {
    if (title === "searchKeyword") {
      setFilterDataAction({
        ...filterData,
        searchKeyword: value,
      });
      setPageAction(1);
    }
  };

  return (
    <div className="issues-action-container">
      <ListingHeader
        title="Issue & Action"
        iconButtonTitle={`Add New ${
          screenType === "issues" ? "Issue" : "Action"
        }`}
        pathToNavigate={
          screenType === "issues"
            ? "/issues-action/issues/create"
            : "/issues-action/action/create"
        }
        permissionTitle="issue"
      />

      <div className="issue-action-tabs">
        <div className={`issue-tab ${screenType}`}>
          <div className={`tabs-button`}>
            <button
              className={screenType === "issues" ? "active" : ""}
              onClick={() => {
                setFilterData({
                  issueType: [],
                  pagination: true,
                  searchKeyword: "",
                });
                setFilterDataAction({
                  searchKeyword: "",
                });
                navigate("/issues-action/issues");
              }}
            >
              Issues
            </button>
          </div>
          <div className={`tabs-button`}>
            <button
              className={screenType === "action" ? "active" : ""}
              onClick={() => {
                setFilterData({
                  issueType: [],
                  pagination: true,
                  searchKeyword: "",
                });
                setFilterDataAction({
                  searchKeyword: "",
                });
                navigate("/issues-action/action");
              }}
            >
              Action
            </button>
          </div>
        </div>
      </div>
      {screenType === "issues" ? (
        <IssueFilter filterHandler={handleFilter} />
      ) : (
        <ActionFilter filterHandler={handleFilterAction} />
      )}
      {!isError && (
        <div className="listing-table">
          <Table
            tableColumns={
              screenType === "issues" ? TABLE_COLUMNS : ACTION_TABLE_COLUMN
            }
            sortingStatus={sortingStatus}
            setSortingStatus={setSortingStatus}
            paginationCount={
              screenType === "issues"
                ? data?.data?.pageSize
                : actionData?.data?.data?.pageSize
            }
            handlePaginationValue={
              screenType === "issues" ? setPage : setPageAction
            }
            currentPage={screenType === "issues" ? page : pageAction}
            isLoading={isLoading}
            tableData={screenType === "issues" ? transData : transActionData}
          />
        </div>
      )}
      <CreateEditIssues page={page} />
    </div>
  );
};

export default IssuesAction;
