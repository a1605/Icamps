import { http } from "../../../services/httpServices";

export const getAppList = async (page) =>
  await http.get(`/inventory/application?page=${page - 1}&pageSize=15`);

export const getAppLists = async (page) =>
  await http.get(`/inventory/application?page=${page - 1}&pageSize=15`);

export const getAppWithStatus = async (page, filterData, status, col, order) =>
  await http.post(
    `/inventory/application/filter?page=${page - 1}&pageSize=15`,
    {
      applicationNames: [],
      appTypes:[],
      status: [...status],
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

export const getAllApps = async () => await http.get(`/inventory/applications`);

//edit
export const getUpdateSingleApp = async (id) => {
  const response = await http.get(`/inventory/application/${id}`);
  return response;
};

export const deleteSingleApps = async (id) =>
  await http.delete(`/inventory/application/${id}`);

export const updateSingleApplication = async (data) =>
  await http.put(`/inventory/application/${data.applicationId}`, data);

//View
export const getSingleApp = async (id) => {
  const response = await http.get(`/inventory/application/${id}`);
  return response;
};

export const createSingleApp = async (data) => {
  const response = await http.post(`/inventory/application`, data);
  return response;
};

//dropdown data API
export const getPermissionList = async (filter) =>
  await http.get(
    `/inventory/permission/required?page=${
      filter.page - 1
    }&pageSize=15&pagination=${filter.pagination}`
  );

export const getLibarayList = async (filter) =>
  await http.get(
    `/inventory/libraries?page=${filter.page - 1}&pageSize=15&pagination=${
      filter.pagination
    }`
  );

export const getSubTypeList = async (filter) => await http.get(
  `/inventory/sub/type?page=${filter.page - 1}&pagination=${
    filter.pagination
  }&pageSize=15`
)

export const getPublisherList = async (filter) =>
  await http.get(
    `/inventory/publisher?page=${filter.page - 1}&pageSize=15&pagination=${
      filter.pagination
    }`
  );

export const getKPI = async () =>
  await http.post("/inventory/application/kpi/status", [
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
