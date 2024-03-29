import { useQuery } from "@tanstack/react-query";
import { getApprovalOsList } from "../services/approvalOsServices";
import { APPROVAL_OS_QUERY_KEY } from "../approvalOs.constant";

const useFetchApprovalOs = (page, filter, col, order) => {
  return useQuery(
    [APPROVAL_OS_QUERY_KEY.LISTING_KEY, page, filter, col, order],
    () => getApprovalOsList(page, filter, col, order)
  );
};

export default useFetchApprovalOs;
