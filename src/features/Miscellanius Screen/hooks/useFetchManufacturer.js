import { useQuery } from "@tanstack/react-query";
import { MANUFACTURE_KEY } from "../miscellaneous.constant";
import { getManufacturer } from "../services/miscellaneous.services";

export const useFetchManufacturer = (page, col, order,filterData) =>
  useQuery([MANUFACTURE_KEY.LISTING_KEY, page, col, order,filterData], () =>
    getManufacturer(page, col, order,filterData)
  );
