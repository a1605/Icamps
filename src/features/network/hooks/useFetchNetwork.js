import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getNetworkList } from "../network-service";
import { INVENTORY_QUERY_KEY } from "../network.constant";

const useFetchNetwork = (page, filterData, col, order) => {
  return useQuery(
    [INVENTORY_QUERY_KEY.NETWORK_NUMBER_LISTING, page, filterData, col, order],
    () => getNetworkList(page, filterData, col, order)
  );
};

export { useFetchNetwork };
