import { useQuery } from "@tanstack/react-query";
import { getNewsList } from "../services/newsServices";
import { toast } from "react-hot-toast";
import { INFORMATION_QUERY_KEYS } from "../news.constant";

const useFetchNews = (page, filter, col, order) => {
  return useQuery(
    [INFORMATION_QUERY_KEYS.FETCH_INFORMATION, page, filter, col, order],
    () => getNewsList(page, filter, col, order)
  );
};

export { useFetchNews };
