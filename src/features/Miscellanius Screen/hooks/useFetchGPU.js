import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { GPU_KEY } from "../miscellaneous.constant";
import { getGPU } from "../services/miscellaneous.services";

export const useFetchGPU = (page,col, order,filterData) =>
  useQuery([GPU_KEY.LISTING_KEY, page,col, order,filterData], () =>
    getGPU(page,col, order,filterData)
  );
