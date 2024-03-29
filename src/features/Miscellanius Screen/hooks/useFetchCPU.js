import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CPU_KEY } from "../miscellaneous.constant";
import { getCPU } from "../services/miscellaneous.services";

export const useFetchCPU = (page,  col, order,filterData) =>
  useQuery([CPU_KEY.LISTING_KEY, page,  col, order,filterData], () =>
    getCPU(page,  col, order,filterData)
  );
