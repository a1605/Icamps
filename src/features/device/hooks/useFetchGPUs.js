import { useQuery } from "@tanstack/react-query";
import { getGpuData } from "../Services/Device.Services";
import { toast } from "react-hot-toast";
import { DEVICE_QUERY_KEY } from "../devices.constant";

export const useFetchGpu = (filter) =>
  useQuery([DEVICE_QUERY_KEY.GET_GPU_DATA, filter], () => getGpuData(filter));
