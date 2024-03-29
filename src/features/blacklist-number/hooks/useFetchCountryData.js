import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../blacklist-number.constant";
import { getCountryData } from "../services/blacklisting-number-services";

export const useFetchCountryData = () => {
  return useQuery([INVENTORY_QUERY_KEY.COUNTRY_LIST], () => getCountryData());
};
