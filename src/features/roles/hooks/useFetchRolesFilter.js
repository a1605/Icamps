import { useQuery } from "@tanstack/react-query";
import { getRolesList } from "../services/rolesServices";
import { toast } from "react-hot-toast";
import { ROLES_QUERY_KEYS } from "../roles.constant";

const useFetchRolesFilter = (filter, col, order) => {
  return useQuery([ROLES_QUERY_KEYS.GET_ROLES_FILTER, filter, col, order], () =>
    getRolesList(filter, col, order)
  );
};

export default useFetchRolesFilter;
