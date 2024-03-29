import { useQuery } from "@tanstack/react-query";
import { INVENTORY_QUERY_KEY } from "../feedback.constant";
import { getSingleFeedback } from "../services/feedback-services";
import { toast } from "react-hot-toast";

export const useGetSingleFeedback = (id) =>
  useQuery([INVENTORY_QUERY_KEY.GET_SINGLE_FEEDBACK, id], () =>
    getSingleFeedback(id)
  );
