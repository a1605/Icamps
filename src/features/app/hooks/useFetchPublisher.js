import { useQuery } from "@tanstack/react-query";
import { getPublisherList } from "../Services/appServices";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../app.constant";

const useFetchPublisher = (filter) => {
  return useQuery([INVENTORY_QUERY_KEY.PUBLISHER, filter], () =>
    getPublisherList(filter)
  );
};

export { useFetchPublisher };
