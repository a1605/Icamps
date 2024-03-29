import { useQuery } from "@tanstack/react-query";
import { getSingleNews } from "../services/newsServices";
import { toast } from "react-hot-toast";
import { INFORMATION_QUERY_KEYS } from "../news.constant";

export const useFetchSingleNews = (id) => {
  if (id)
    return useQuery([INFORMATION_QUERY_KEYS.FETCH_SINGLE_INFORMATION, id], () =>
      getSingleNews(id)
    );
};
