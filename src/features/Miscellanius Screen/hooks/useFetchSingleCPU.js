import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CPU_KEY } from "../miscellaneous.constant";
import { getSingleCPU } from "../services/miscellaneous.services";

export const useFetchSingleCPU = (id, screenType) => {
  return useQuery([CPU_KEY.SINGLE_KEY, id], () =>
    screenType === "cpu" && id && id !== "" ? getSingleCPU(id) : {}
  );
};
