import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../services/userServices";
import { toast } from "react-hot-toast";
import { ROLES_QUERY_KEYS } from "../../roles/roles.constant";

export const useFetchRoles = () => {
  return useQuery([ROLES_QUERY_KEYS.GET_ALL_ROLES], () => getAllRoles(), {});
};
