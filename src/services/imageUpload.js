import { http } from "./httpServices";

export const uploadImage = async (data) => {
  return await http.post("/information/image/upload", data);
};

export const uploadFile = async (url, data) => {
  return await http.post(url, data);
};

export const uploadAboutFile = async (data) => {
  return await http.post("/about/file/upload", data);
};
