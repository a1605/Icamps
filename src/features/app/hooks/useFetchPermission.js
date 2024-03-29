import { useQuery } from "@tanstack/react-query";
import { getPermissionList } from "../Services/appServices";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../app.constant";

const useFetchPermission = (filter) => {
  return useQuery([INVENTORY_QUERY_KEY.PERMISSION, filter], () =>
    getPermissionList(filter)
  );
};

export { useFetchPermission };
