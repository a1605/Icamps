import { http } from "../../../services/httpServices";

export const getBestPracticesList = async (page, filterData, col, order) =>
  await http.post(
    `/inventory/best/practice/filter?page=${page - 1}&pageSize=15`,
    {
      titles: [],
      pagination: true,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );

export const createSingleBestPractice = async (data) =>
  await http.post(`/inventory/best/practice`, data);

export const updateSingleBestPractice = async (data) =>
  await http.put(`/inventory/best/practice/${data.bestPracticeId}`, data);

export const getSingleBestPractice = async (id) =>
  await http.get(`/inventory/best/practice/${id}`);
