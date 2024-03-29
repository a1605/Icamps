import { useQuery } from "@tanstack/react-query";
import { getOsFilter } from "../services/OS.Services";
import { toast } from "react-hot-toast";
import { OS_QUERY_KEY } from "../os.constant";
export const useFetchOSFilter = () => {
  return useQuery([OS_QUERY_KEY.LIST_OS], getOsFilter);
};
