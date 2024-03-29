import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getKPI } from "../services/blacklisting-number-services";
import { KPI_KEY } from "../../../common/global.constant";

const useFetchKPI = () => {
  return useQuery([KPI_KEY.BLACKLIST], getKPI, {});
};

export { useFetchKPI };
