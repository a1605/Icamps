import { useQuery } from "@tanstack/react-query";
import { getSingleIssue } from "../services/issuesServices";
import { toast } from "react-hot-toast";
import {
  ISSUE_ACTION_SCREEN_TYPE,
  ISSUE_QUERY_KEY,
} from "../issuesAction.constant";

const useGetSingleIssue = (id, screen) =>
  useQuery([ISSUE_QUERY_KEY.GET_SINGLE_ISSUE, id], () =>
    id && screen === ISSUE_ACTION_SCREEN_TYPE.ISSUE
      ? getSingleIssue(id)
      : () => {}
  );

export { useGetSingleIssue };
