import { GLOBAL_STATUS } from "../../../common/global.constant";
import { http } from "../../../services/httpServices";

export const getCyberCellList = async (page, filterData, col, order) =>
  await http.post(
    `/inventory/cyber/security/filter?page=${page - 1}&pageSize=15`,
    {
      states: [],
      cities: [],
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



export const updateSingleCyberCell = async (data) =>
  await http.put(`/inventory/cyber/security/${data.cyberCellId}`, data);

export const getSingleCyberCell = async (id) =>
  await http.get(`/inventory/cyber/security/${id}`);

export const createSingleCyberCell = async (data) => {
  const resp = await http.post(`/inventory/cyber/security`, data);
  return resp;
};

export const getCyberCellFilter = async () =>
  await http.get(`/inventory/cyber/security`);

export const getCyberCellState = async () =>
  await http.get(
    `/inventory/cyber/security/state?page=0&pagination=false&pageSize=15`
  );
export const getCyberCellCity = async () =>
  await http.get(
    `/inventory/cyber/security/city?page=0&pagination=false&pageSize=15`
  );

