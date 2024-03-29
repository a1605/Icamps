import { useQuery } from "@tanstack/react-query";
import { getSingleDevice } from "../Services/Device.Services";
import { toast } from "react-hot-toast";
import { DEVICE_QUERY_KEY } from "../devices.constant";

const useFetchSingleDevice = (id) => {
  if (id && id !== "")
    return useQuery([DEVICE_QUERY_KEY.GET_SINGLE_DEVICE_DATA, id], () =>
      getSingleDevice(id)
    );
};

export { useFetchSingleDevice };
