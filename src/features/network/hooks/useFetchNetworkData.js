import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSingleNetwork } from "../network-service";
import { INVENTORY_QUERY_KEY } from "../network.constant";

export const useFetchNetworkData = (id) => {
  return useQuery([INVENTORY_QUERY_KEY.NETWORK_SINGLE_VIEW], () =>
    !id ? {} : getSingleNetwork(id)
  );
};
