import { http } from "./httpServices";

export const getAssigneeList = async (permission) =>
  await http.post("/information/assignee", {
    status: "",
    ...permission,
  });
