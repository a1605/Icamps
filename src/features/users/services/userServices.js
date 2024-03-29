import { http } from "../../../services/httpServices";

export const getUsersList = async (page, filter, order, col) => {
  const resp = await http.post(
    `/user/filter?page=${page - 1}&pagination=${filter.pagination}&pageSize=15`,
    filter,
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
  return resp;
};

export const getSingleUserRoles = async (id) => {
  const response = await http.get(`/user/${id}`);
  return response;
};

export const getAllRoles = async (page = 1) => {
  const response = await http.get(`/role?page=${page - 1}&pageSize=15`);
  return response;
};

export const CreateUser = async (userInfo) => {
  const resp = await http.post("/user", userInfo);
  return resp;
};

export const UpdateUser = async (userInfo) => {
  const resp = await http.put(`/user/${userInfo?.userId}`, userInfo);
  return resp;
};
