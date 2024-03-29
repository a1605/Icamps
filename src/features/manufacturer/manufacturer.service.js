import { http } from "../../services/httpServices";

export const getManufacturerList = async (page = 1) => {
  const resp = await http.get(`/manufacturer?page=${page - 1}&pageSize=15`);
  return resp;
};
