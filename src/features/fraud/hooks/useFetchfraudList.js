import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_FRAUD_QUERY_KEY } from "../fraud.constant";
import { getFraudList } from "../Services/fraudServices";

const useFetchFraudList = (page, filterData, col, order) => {
  return useQuery(
    [
      INVENTORY_FRAUD_QUERY_KEY.FRAUD_LISTING,
      page,
      filterData,
      col,
      order,
    ],
    () => getFraudList(page, filterData, col, order)
  );
};

export { useFetchFraudList };
