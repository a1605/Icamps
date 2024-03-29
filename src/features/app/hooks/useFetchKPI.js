import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getKPI } from "../Services/appServices";
import { KPI_KEY } from "../../../common/global.constant";

const useFetchKPI = () => {
  return useQuery([KPI_KEY.APP], getKPI, {});
};

export { useFetchKPI };
