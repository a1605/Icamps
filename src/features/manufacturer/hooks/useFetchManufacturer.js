import { useQuery } from "@tanstack/react-query";
import { getManufacturerList } from "../manufacturer.service";
import { toast } from "react-hot-toast";

export const useFetchManufacturer = (page) => {
  return useQuery(["get-manufacturer-list", page], () =>
    getManufacturerList(page)
  );
};
