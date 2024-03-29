import { useQuery } from "@tanstack/react-query";
import { getSingleUserRoles, getUsersList } from "../services/userServices";
import { toast } from "react-hot-toast";
import { QUERY_KEYS } from "../users.constant";

export const useFetchUsers = (col, order, page, filter) => {
  return useQuery([QUERY_KEYS.GET_USERS_LIST, page, filter, order, col], () =>
    getUsersList(page, filter, order, col)
  );
};

export const useFetchSingleUserRoles = (id = null) => {
  return useQuery([QUERY_KEYS.GET_SINGLE_USER_ROLES, id], () =>
    id ? getSingleUserRoles(id) : {}
  );
};
