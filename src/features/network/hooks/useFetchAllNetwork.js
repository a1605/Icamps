import { toast } from "react-hot-toast";
import { getAllNetworks, getNetworkFilter } from "../network-service";
import { INVENTORY_QUERY_KEY } from "../network.constant";
import { useQuery } from "@tanstack/react-query";

const useFetchNetworkFilter = () => {
  return useQuery([INVENTORY_QUERY_KEY.NETWORK_FILTER], () =>
    getNetworkFilter()
  );
};

export { useFetchNetworkFilter };
