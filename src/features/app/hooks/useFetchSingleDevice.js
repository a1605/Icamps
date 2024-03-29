import { useQuery } from "@tanstack/react-query";
import { getSingleApp } from "../Services/appServices";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../app.constant";

const useFetchSingleApplication = (id) => {
  if (id && id !== "")
    return useQuery([INVENTORY_QUERY_KEY.APP_VIEW, id], () => getSingleApp(id));
};

export { useFetchSingleApplication };
