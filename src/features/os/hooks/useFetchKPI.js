import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getKPI } from "../services/OS.Services";
import { KPI_KEY } from "../../../common/global.constant";

const useFetchKPI = () => {
  return useQuery([KPI_KEY.OS], getKPI, {});
};

export { useFetchKPI };
