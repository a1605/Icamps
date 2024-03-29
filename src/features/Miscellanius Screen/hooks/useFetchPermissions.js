import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { PERMISSIONS_KEY } from "../miscellaneous.constant";
import { getPermissions } from "../services/miscellaneous.services";
export const useFetchPermissions = (page, col, order,filterData) =>
  useQuery([PERMISSIONS_KEY.LISTING_KEY, page, col, order,filterData], () =>
    getPermissions(page, col, order,filterData)
  );
