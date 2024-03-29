import { useQuery } from "@tanstack/react-query";
import { getAssigneeList } from "../services/assigneeServies";

export const useFetchTableAssigneeList = (permission = {}, show) => {
  return useQuery(
    ["get-change-assignee-list", permission, show],
    () => (show ? getAssigneeList(permission) : {}),
    {}
  );
};
