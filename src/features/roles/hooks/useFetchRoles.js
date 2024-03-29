import { useQuery } from "@tanstack/react-query";
import { getRolesList } from "../services/rolesServices";
import { toast } from "react-hot-toast";
import { ROLES_QUERY_KEYS } from "../roles.constant";

const useFetchRoles = (filter, col, order) => {
  return useQuery([ROLES_QUERY_KEYS.GET_ALL_ROLES, filter, col, order], () =>
    getRolesList(filter, col, order)
  );
};

export default useFetchRoles;
