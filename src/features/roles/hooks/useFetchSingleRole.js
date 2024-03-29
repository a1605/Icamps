import { useQuery } from "@tanstack/react-query";
import { getSingleRole } from "../services/rolesServices";
import { toast } from "react-hot-toast";
import { ROLES_QUERY_KEYS } from "../roles.constant";

const useFetchSingleRole = (id) => {
  if (!id) return {};
  return useQuery([ROLES_QUERY_KEYS.GET_SINGLE_ROLE, id], () =>
    getSingleRole(id)
  );
};

export default useFetchSingleRole;
