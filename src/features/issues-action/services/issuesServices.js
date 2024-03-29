import { http } from "../../../services/httpServices";

export const getIssues = async (
  filter,
  page = 1,
  col = "updatedOn",
  order = "DESC"
) => {
  const resp = await http.post(
    `/inventory/issue/filter?page=${page - 1}&pageSize=15`,
    filter,
    {
      headers: {
        col: col,
        order: order,
      },
    }
  );
  return resp;
};

export const getSingleIssue = async (id) =>
  await http.get(`/inventory/issue/${id}`);

export const createSingleIssue = async (data) =>
  await http.post("/inventory/issue", data);

export const updateSingleIssue = async (data) =>
  await http.put("/inventory/issue/" + data.issueId, data);

export const deleteSingleIssue = async (id) =>
  await http.delete(`/inventory/issue/${id}`);

// Action Service

export const getActionList = async (filter, order, col, page = 1) => {
  const resp = await http.get(
    `/inventory/action/search?page=${page - 1}&pageSize=15&keyword=${
      filter.searchKeyword
    }`,
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
  return resp;
};
export const getActions = async () => await http.get("/inventory/actions");

export const getSingleAction = async (id) =>
  await http.get(`/inventory/action/${id}`);

export const createSingleAction = async (data) =>
  await http.post("/inventory/action", data);

export const updateSingleAction = async (data) =>
  await http.put("/inventory/action/" + data.actionId, data);

export const deleteSingleAction = async (id) =>
  await http.delete(`/inventory/action/${id}`);
