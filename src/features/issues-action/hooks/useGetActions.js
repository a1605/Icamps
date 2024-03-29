import { useQuery } from "@tanstack/react-query";
import { getActionList, getActions } from "../services/issuesServices";
import { toast } from "react-hot-toast";
import { ISSUE_QUERY_KEY } from "../issuesAction.constant";

const useGetActions = () => {
  return useQuery([ISSUE_QUERY_KEY.GET_ACTIONS_FOR_ISSUE], getActions);
};

export { useGetActions };
