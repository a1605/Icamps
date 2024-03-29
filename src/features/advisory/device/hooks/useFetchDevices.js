import { useQuery } from "@tanstack/react-query";
import { getDevices } from "../Services/Device.Services";
import { DEVICE_QUERY_KEY } from "../../../device/devices.constant";
const useFetchDevices = (page, filterData, col, order) => {
  return useQuery(
    [DEVICE_QUERY_KEY.LISTING_KEY, page, filterData, col, order],
    () => getDevices({ page, filterData, col, order })
  );
};

export { useFetchDevices };
