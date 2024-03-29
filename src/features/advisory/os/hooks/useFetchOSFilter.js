import { useQuery } from "@tanstack/react-query";
import { getOsFilter } from "../services/OS.Services";
import { toast } from "react-hot-toast";
import { OS_QUERY_KEY } from "../../../os/os.constant";
export const useFetchOSFilter = (page, filterData) => {
  return useQuery([OS_QUERY_KEY.LIST_OS, page, filterData], () =>
    getOsFilter({ page, filterData })
  );
};
