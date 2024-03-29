import { useQuery } from "@tanstack/react-query";
import { INVENTORY_QUERY_KEY } from "../cyber-cell.constant";
import {
  getCyberCellCity,
  getCyberCellState,
} from "../services/cyber-cell-service";

export const useFetchCybercellFilterState = () => {
  return useQuery([INVENTORY_QUERY_KEY.CYBERCELL_FILTER_STATE], () =>
    getCyberCellState()
  );
};

export const useFetchCybercellFilterCity = () => {
  return useQuery([INVENTORY_QUERY_KEY.CYBERCELL_FILTER_CITY], () =>
    getCyberCellCity()
  );
};
