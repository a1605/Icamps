import { useQuery } from "@tanstack/react-query";
import { getApprovalList } from "../services/approvalServices";
import { toast } from "react-hot-toast";
import { APPROVAL_QUERY_KEY } from "../approval.constant";

const useFetchApproval = (page, filter, col, order) => {
  return useQuery(
    [APPROVAL_QUERY_KEY.LISTING_KEY, page, filter, col, order],
    () => getApprovalList(page, filter, col, order)
  );
};

export default useFetchApproval;
