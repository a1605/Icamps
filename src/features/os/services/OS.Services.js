import { http } from "../../../services/httpServices";

const getSingleOS = async (id) => {
  const response = await http.get(`/inventory/os/${id}`);
  return response;
};

const getOs = async ({ page = 1, filterData, col, order, pagination }) =>
  await http.post(
    `/inventory/os/filter?page=${page - 1}&pageSize=15`,
    {
      devices: [],
      aospCodename: [],
      status: [],
      pagination: pagination,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );

const getOsFilter = async () => {
  const response = await http.get(`/inventory/os`);
  return response;
};
const deleteSingleOS = async (id) => {
  const response = await http.delete(`/inventory/os/${id}`);
  return response;
};

const updateSingleOS = async (data) => {
  const response = await http.put(`/inventory/os/${data.osId}`, data);
  return response;
};

const createSingleOS = async (data) => {
  const response = await http.post(`/inventory/os`, data);
  return response;
};
const getKPI = async () =>
  await http.post("/inventory/os/kpi/status", [
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

export {
  getKPI,
  getOsFilter,
  getSingleOS,
  getOs,
  deleteSingleOS,
  updateSingleOS,
  createSingleOS,
};
