import { GLOBAL_STATUS } from "../../../common/global.constant";
import { http } from "../../../services/httpServices";

export const getBlacklistNumberList = async (page, filterData, status,col,order) =>
  await http.post(
    `/inventory/blacklisted/number/filter?page=${page - 1}&pageSize=15`,
    {
      fraudCategory: [],
      sources: [],
      status,
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

export const getBlacklistFilter = async () =>
  await http.get(`/inventory/blacklisted/number`);

export const deleteSingleBlacklistNumber = async (id) =>
  await http.delete(`/inventory/blacklisted/number/${id}`);

export const updateSingleBlacklistNumber = async (data) =>
  await http.put(
    `/inventory/blacklisted/number/${data.blackListedNumberId}`,
    data
  );

export const getSingleBlacklistNumber = async (id) =>
  await http.get(`/inventory/blacklisted/number/${id}`);

export const createSingleBlacklist = async (data) => {
  const resp = await http.post(`/inventory/blacklisted/number`, data);
  return resp;
};

export const getCountryData = async () =>
  await http.get(`/inventory/country/details`);

export const getKPI = async () =>
  await http.post("/inventory/blacklisted/number/kpi/status", [
    GLOBAL_STATUS.APPROVED,
    GLOBAL_STATUS.DRAFT,
    GLOBAL_STATUS.REJECTED,
    GLOBAL_STATUS.ADVICE_A,
    GLOBAL_STATUS.ADVICE_C,
    GLOBAL_STATUS.DELETED,
    GLOBAL_STATUS.UNPUBLISHED,
    GLOBAL_STATUS.REQ_UNPUBLISHED,
    GLOBAL_STATUS.SUBMITTED,
  ]);
