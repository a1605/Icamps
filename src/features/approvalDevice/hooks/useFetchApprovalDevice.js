import { useQuery } from "@tanstack/react-query";
import { getApprovalDeviceList } from "../services/approvalDeviceServices";
import { toast } from "react-hot-toast";
import { APPROVAL_DEVICE_QUERY_KEY } from "../approvalDevice.constant";

const useFetchApprovalDevice = (page, filter, col, order) => {
  return useQuery(
    [APPROVAL_DEVICE_QUERY_KEY.LISTING_KEY, page, filter, col, order],
    () => getApprovalDeviceList(page, filter, col, order)
  );
};

export default useFetchApprovalDevice;
