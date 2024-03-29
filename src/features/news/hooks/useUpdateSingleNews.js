import { useQuery } from "@tanstack/react-query";
import { updateSingleNews } from "../services/newsServices";

export const useUpdateSingleNews = (data) => {
  return useQuery(["get-issue-list", data], () => updateSingleNews(data));
};
