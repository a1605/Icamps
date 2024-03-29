import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { THIRD_PARTY_KEY } from "../miscellaneous.constant";
import { getThirdParty } from "../services/miscellaneous.services";

export const useFetchThirdParty = (page, col, order,filterData) =>
  useQuery([THIRD_PARTY_KEY.LISTING_KEY, page, col, order,filterData], () =>
    getThirdParty(page, col, order,filterData)
  );
