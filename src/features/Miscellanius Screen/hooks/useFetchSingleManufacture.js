import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { MANUFACTURE_KEY } from "../miscellaneous.constant";
import { getSingleManufacturer } from "../services/miscellaneous.services";

export const useFetchSingleManufacturer = (id, screenType) => {
  return useQuery([MANUFACTURE_KEY.SINGLE_KEY, id], () =>
    screenType === "manufacturer" && id && id !== ""
      ? getSingleManufacturer(id)
      : {}
  );
};
