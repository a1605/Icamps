import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../services/issuesServices";
import { ISSUE_QUERY_KEY } from "../issuesAction.constant";

const useGetIssues = (filter, order, col, page = 1) => {
  return useQuery(
    [ISSUE_QUERY_KEY.GET_ISSUE_LIST, page, filter, order, col],
    () => getIssues(filter, page, col, order)
  );
};

export { useGetIssues };
