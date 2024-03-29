import { useQuery } from "@tanstack/react-query";
import {getSingleFaq} from "../Services/faqServices"
import {INVENTORY_FAQ_QUERY_KEY} from "../faq.constant"

export const useFetchFaqData = (id) => {
  return useQuery([INVENTORY_FAQ_QUERY_KEY.FAQ_VIEW,id], () =>
    !id ? {} : getSingleFaq(id)
  );
};
