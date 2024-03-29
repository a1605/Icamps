import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllIssues } from "../services/getAllIssues";
import { QUERY_KEYS } from "../features/news/news.constant";

export const useGetAllIssues = (issueType) =>
  useQuery([QUERY_KEYS.GET_ALL_ISSUES, issueType], () =>
    getAllIssues(issueType)
  );
