import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../cyber-cell.constant";
import { getCyberCellList } from "../services/cyber-cell-service";

const useFetchCyberCell = (page, filterData, col, order) => {
  return useQuery(
    [
      INVENTORY_QUERY_KEY.CYBERCELL_NUMBER_LISTING,
      page,
      filterData,
      col,
      order,
    ],
    () => getCyberCellList(page, filterData, col, order)
  );
};

export { useFetchCyberCell };
