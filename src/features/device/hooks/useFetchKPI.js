import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getKPI } from "../Services/Device.Services";
import { KPI_KEY } from "../../../common/global.constant";

const useFetchKPI = () => {
  return useQuery([KPI_KEY.DEVICE], getKPI, {});
};

export { useFetchKPI };
