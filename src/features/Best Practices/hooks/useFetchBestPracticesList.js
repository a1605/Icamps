import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_BEST_QUERY_KEY } from "../best-practices.constant";
import { getBestPracticesList } from "../Services/best-practicesServices";

const useFetchBestPracticesList = (page, filterData, col, order) => {
  return useQuery(
    [
      INVENTORY_BEST_QUERY_KEY.BEST_PRACTICES_LISTING,
      page,
      filterData,
      col,
      order,
    ],
    () => getBestPracticesList(page, filterData, col, order)
  );
};

export { useFetchBestPracticesList };
