import { useQuery } from "@tanstack/react-query";
import { getSingleFraud } from "../Services/fraudServices";
import { INVENTORY_FRAUD_QUERY_KEY } from "../fraud.constant";

export const useFetchFraudData = (id) => {
  return useQuery([INVENTORY_FRAUD_QUERY_KEY.BEST_SINGLE_VIEW], () =>
    !id ? {} : getSingleFraud(id)
  );
};
