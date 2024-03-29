import { http } from "../../../services/httpServices";

export const getFraudList = async (page, filterData, col, order) =>
  await http.post(
    `/inventory/fraud/filter?page=${page - 1}&pageSize=15`,
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

export const createSingleFraud = async (data) =>
  await http.post(`/inventory/fraud`, data);

export const updateSingleFraud = async (data) =>
  await http.put(`/inventory/fraud/${data.fraudId}`, data);

export const getSingleFraud = async (id) =>
    await http.get(`/inventory/fraud/${id}`)
