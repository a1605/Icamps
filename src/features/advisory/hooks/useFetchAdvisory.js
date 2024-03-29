import { useQuery } from "@tanstack/react-query";
import { getAdvisoryList } from "../services/advisoryServices";
import { ADVISORY_QUERY_KEY } from "../advisory.constant";

const useFetchAdvisory = (page, filter, col, order) => {
  return useQuery(
    [ADVISORY_QUERY_KEY.LISTING_KEY, page, filter, col, order],
    () => getAdvisoryList(page, filter, col, order)
  );
};

export default useFetchAdvisory;
