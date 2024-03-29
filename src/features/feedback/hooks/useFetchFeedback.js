import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getFeedbackList } from "../services/feedback-services";
import { INVENTORY_QUERY_KEY } from "../feedback.constant";

const useFetchFeedback = (page) => {
  return useQuery([INVENTORY_QUERY_KEY.FEEDBACK_LISTING, page], () =>
    getFeedbackList(page)
  );
};

export { useFetchFeedback };
