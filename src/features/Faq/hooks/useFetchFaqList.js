import { useQuery } from "@tanstack/react-query";
import { INVENTORY_FAQ_QUERY_KEY } from "../faq.constant";
import { getFaqList } from "../Services/faqServices";

const useFetchFaqList = (page, filterData, col, order) => {
  return useQuery(
    [INVENTORY_FAQ_QUERY_KEY.FAQ_LISTING, page, filterData, col, order],
    () => getFaqList(page, filterData, col, order)
  );
};

export { useFetchFaqList };
