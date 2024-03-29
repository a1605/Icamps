import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { APP_PUBLISHER_KEY } from "../miscellaneous.constant";
import { getAppPublisher } from "../services/miscellaneous.services";

export const useFetchAppPublisher = (page, col, order, filterData) =>
  useQuery([APP_PUBLISHER_KEY.LISTING_KEY, page, col, order, filterData], () =>
    getAppPublisher(page, col, order, filterData)
  );
