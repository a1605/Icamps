import { useQuery } from "@tanstack/react-query";
import { getUpdateSingleApp } from "../Services/appServices";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../app.constant";

export const useFetchSingleApp = (id) => {
  if (id && id !== "")
    return useQuery([INVENTORY_QUERY_KEY.EDIT_APP, id], () =>
      getUpdateSingleApp(id)
    );
};
