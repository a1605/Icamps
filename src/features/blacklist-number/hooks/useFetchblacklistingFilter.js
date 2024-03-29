import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../blacklist-number.constant";
import { getBlacklistFilter } from "../services/blacklisting-number-services";

export const useFetchblacklistingFilter = () => {
  return useQuery([INVENTORY_QUERY_KEY.BLACKLIST_FILTER], () =>
    getBlacklistFilter()
  );
};
