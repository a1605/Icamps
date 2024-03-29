import { useQuery } from "@tanstack/react-query";
import { getOs } from "../services/OS.Services";
import { toast } from "react-hot-toast";
import { OS_QUERY_KEY } from "../os.constant";
export const useFetchOs = (page, filterData, col, order, pagination) => {
  return useQuery(
    [OS_QUERY_KEY.LISTING_KEY, page, filterData, col, order, pagination],
    () => getOs({ page, filterData, col, order, pagination })
  );
};
