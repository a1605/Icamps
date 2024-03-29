import { useQuery } from "@tanstack/react-query";
import { getSingleAction } from "../services/issuesServices";
import { toast } from "react-hot-toast";
import {
  ISSUE_ACTION_SCREEN_TYPE,
  ISSUE_QUERY_KEY,
} from "../issuesAction.constant";

export const useGetSingleAction = (id, screen) =>
  useQuery([ISSUE_QUERY_KEY.GET_SINGLE_ACTION, id], () =>
    id && screen === ISSUE_ACTION_SCREEN_TYPE.ACTION
      ? getSingleAction(id)
      : () => {}
  );
