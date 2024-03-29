import { http } from "../../../services/httpServices";

export const updateSingleAbout = async (data) =>
  await http.put(`/about/${data.id}`, data);

  export const getSingleAbout = async (id) =>
  await http.get(`/about/${id}`);