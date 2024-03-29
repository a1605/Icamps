import { http } from "../../../services/httpServices";

export const getRolesList = async (filter, col, order) => {
  const resp = await http.post(
    `/role/filter?page=0&pageSize=50`,
    {
      roleNames: [],
      ...filter,
      pagination: filter.pagination,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
  return resp;
};
export const getRolesListView = async (filter) => {
  const resp = await http.post(`/user/filter?page=0&pageSize=50`, {
    roles: [filter],
  });
  return resp;
};

export const getSingleRole = async (id) => await http.get(`/role/${id}`);

export const deleteSingleRole = async (id) => {
  const resp = await http.delete("/role/" + id);
  return resp;
};

export const getPermissionList = async () => await http.get("/permission");

export const createRole = async (data) => await http.post("/role", data);

export const updateRole = async (data) =>
  await http.put("/role/" + data.roleId, data);
