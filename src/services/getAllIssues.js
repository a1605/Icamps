import { http } from "./httpServices";

export const getAllIssues = async (issueType = []) =>
  await http.post("/inventory/issue/filter", {
    issueType: [...issueType],
  });
