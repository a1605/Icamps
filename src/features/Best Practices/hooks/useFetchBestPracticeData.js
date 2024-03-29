import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSingleBestPractice } from "../Services/best-practicesServices";
import { INVENTORY_BEST_QUERY_KEY } from "../best-practices.constant";

export const useFetchBestPracticeData = (id) => {
  return useQuery([INVENTORY_BEST_QUERY_KEY.BEST_SINGLE_VIEW], () =>
    !id ? {} : getSingleBestPractice(id)
  );
};
