import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../cyber-cell.constant";
import { getSingleCyberCell } from "../services/cyber-cell-service";

export const useFetchCyberCellData = (id) => {
  return useQuery([INVENTORY_QUERY_KEY.CYBERCELL_SINGLE_VIEW], () =>
    !id ? {} : getSingleCyberCell(id)
  );
};
