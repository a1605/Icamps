import { useQuery } from "@tanstack/react-query";
import { getAssigneeList } from "../services/assigneeServies";

export const useFetchAssigneeList = (permission = {}) =>
  useQuery(
    ["get-assignee-list", permission],
    () => getAssigneeList(permission),
    {}
  );
