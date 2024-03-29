import { useQuery } from "@tanstack/react-query";
import { getRolesListView } from "../services/rolesServices";
import { toast } from "react-hot-toast";
import { ROLES_QUERY_KEYS } from "../roles.constant";

const useFetchRoleView = (roleNames, col, order) => {
  return useQuery([ROLES_QUERY_KEYS.GET_ROLE_VIEW, roleNames, col, order], () =>
    roleNames && roleNames !== "" ? getRolesListView(roleNames, col, order) : {}
  );
};

export default useFetchRoleView;
