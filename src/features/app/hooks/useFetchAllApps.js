import { useQuery } from "@tanstack/react-query";
import { getAllApps } from "../Services/appServices";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../app.constant";

const useFetchAllApps = () => {
  return useQuery([INVENTORY_QUERY_KEY.ALL_APP], () => getAllApps(), {});
};

export { useFetchAllApps };
