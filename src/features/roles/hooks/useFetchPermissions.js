import { useQuery } from "@tanstack/react-query";
import { getPermissionList } from "../services/rolesServices";
import { toast } from "react-hot-toast";
import { ROLES_QUERY_KEYS } from "../roles.constant";

export const useFetchPermissions = () =>
  useQuery([ROLES_QUERY_KEYS.GET_ALL_PERMISSIONS], getPermissionList, {});
