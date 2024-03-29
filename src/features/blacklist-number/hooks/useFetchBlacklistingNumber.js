import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../blacklist-number.constant";
import { getBlacklistNumberList } from "../services/blacklisting-number-services";

const useFetchBlacklistingNumber = (page, filterData, status, col, order) => {
  return useQuery(
    [
      INVENTORY_QUERY_KEY.BLACKLISTING_NUMBER_LISTING,
      page,
      filterData,
      status,
      col,
      order,
    ],
    () => getBlacklistNumberList(page, filterData, status, col, order)
  );
};

export { useFetchBlacklistingNumber };
