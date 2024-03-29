import { useQuery } from "@tanstack/react-query";
import { getActionList } from "../services/issuesServices";
import { toast } from "react-hot-toast";
import { ISSUE_QUERY_KEY } from "../issuesAction.constant";

const useGetAction = (filter, order, col, page) => {
  return useQuery(
    [ISSUE_QUERY_KEY.GET_ACTION_LIST, filter, page, order, col],
    () => getActionList(filter, order, col, page)
  );
};

export { useGetAction };
