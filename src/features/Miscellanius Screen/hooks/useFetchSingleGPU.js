import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { GPU_KEY } from "../miscellaneous.constant";
import { getSingleGPU } from "../services/miscellaneous.services";

export const useFetchSingleGPU = (id, screenType) => {
  return useQuery([GPU_KEY.SINGLE_KEY, id], () =>
    screenType === "gpu" && id && id !== "" ? getSingleGPU(id) : {}
  );
};
