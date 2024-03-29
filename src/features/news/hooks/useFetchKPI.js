import { useQuery } from "@tanstack/react-query";
import { getKPI } from "../services/newsServices";
import { toast } from "react-hot-toast";
import { KPI_KEY } from "../../../common/global.constant";

const useFetchKPI = () => {
  return useQuery([KPI_KEY.NEWS], getKPI, {});
};

export { useFetchKPI };
