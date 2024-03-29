import { http } from "../../services/httpServices";

export const getNetworkList = async (page,  filterData, col, order) =>
  await http.post(
    `/inventory/network/filter?page=${page - 1}&pageSize=15 
    `, {
      brands: [],
      models: [],
      status:[],
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

export const getNetworkFilter = async () =>
  await http.get(`/inventory/network`);

export const updateSingleNetwork = async (data) =>
  await http.put(`/inventory/network/${data.networkId}`, data);

export const getSingleNetwork = async (id) =>
  await http.get(`/inventory/network/${id}`);

export const createSingleNetwork = async (data) => {
  const resp = await http.post(`/inventory/network`, data);
  return resp;
};

export const getAllNetworks = async () =>
  await http.get(
    `/inventory/network?page=${page - 1}&pagination=true&pageSize=14`
  );
