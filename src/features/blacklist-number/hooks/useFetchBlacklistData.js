import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../blacklist-number.constant";
import { getSingleBlacklistNumber } from "../services/blacklisting-number-services";

export const useFetchBlacklistData = (id) => {
  return useQuery([INVENTORY_QUERY_KEY.BLACKLIST_SINGLE_VIEW], () =>
    !id ? {} : getSingleBlacklistNumber(id)
  );
};
