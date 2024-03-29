import { useQuery } from "@tanstack/react-query";
import { getCpuData } from "../Services/Device.Services";
import { toast } from "react-hot-toast";
import { DEVICE_QUERY_KEY } from "../devices.constant";

export const useFetchCpu = (filter) =>
  useQuery([DEVICE_QUERY_KEY.GET_CPU_DATA, filter], () => getCpuData(filter));
