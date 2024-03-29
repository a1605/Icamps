import { useQuery } from "@tanstack/react-query";
import { getLibarayList } from "../Services/appServices";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../app.constant";

const useFetchLibrary = (filter) => {
  return useQuery([INVENTORY_QUERY_KEY.LIBRARY, filter], () =>
    getLibarayList(filter)
  );
};

export { useFetchLibrary };
