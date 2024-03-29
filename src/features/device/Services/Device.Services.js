import { http } from "../../../services/httpServices";

const getSingleDevice = async (id) => await http.get(`/inventory/device/${id}`);

const getDevices = async ({ page = 1, filterData, col, order }) =>
  await http.post(
    `/inventory/device/filter?page=${page - 1}&pageSize=15`,
    {
      manufacturerName: [],
      status: [],
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

const createSingleDevice = async (data) => {
  const resp = await http.post(`/inventory/device`, data);
  return resp;
};

const updateSingleDevices = async (data) => {
  const resp = await http.put(`/inventory/device/${data.deviceId}`, data);
  return resp;
};

const deleteSingleDevices = async (id) => {
  const resp = await http.delete(`/inventory/device/${id}`);
  return resp;
};

export const getGpuData = async (filter) =>
  await http.get(
    `/gpu?page=${filter.page - 1}&pageSize=15&pagination=${filter.pagination}`
  );

export const getCpuData = async (filter) =>
  await http.get(
    `/cpu?page=${filter.page - 1}&pageSize=15&pagination=${filter.pagination}`
  );

export {
  getSingleDevice,
  getDevices,
  updateSingleDevices,
  deleteSingleDevices,
  createSingleDevice,
};
export const getKPI = async () =>
  await http.post("/inventory/device/kpi/status", [
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
