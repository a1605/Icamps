import { http } from "../../../services/httpServices";

export const getNewsList = async (page, filter, col, order) =>
  await http.post(
    `/information/filter?page=${page - 1}&pageSize=15`,
    {
      primaryInventory: [],
      type: [],
      status: [],
      assignee: [],
      pagination: true,
      ...filter,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );

export const getFilteredNewsList = async (page) =>
  await http.post(`/information/filter?page=${page}&pageSize=15`);

export const getSingleNews = async (id) => await http.get("/information/" + id);

export const deleteSingleNews = async (id) =>
  await http.delete("/information/" + id);

export const updateSingleNews = async (data) =>
  await http.put("/information/" + data.informationId, data);

export const createSingleNews = async (data) =>
  await http.post("/information", data);

export const getKPI = async () =>
  await http.post("/information/kpi/status", [
    "APPROVED",
    "IN_APPROVAL",
    "IN_PROGRESS",
    "REJECTED",
    "ADVICE_C",
    "ADVICE_A",
    "DELETED",
    "UNPUBLISHED",
    "REQ_UNPUBLISHED",
  ]);
