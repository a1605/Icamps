import { useQuery } from "@tanstack/react-query";
import { getSingleOS } from "../services/OS.Services";
import { toast } from "react-hot-toast";
import { OS_QUERY_KEY } from "../os.constant";

export const useFetchSingleOS = (id) => {
  if (id && id !== "")
    return useQuery([OS_QUERY_KEY.GET_SINGLE_OS, id], () => getSingleOS(id));
};
