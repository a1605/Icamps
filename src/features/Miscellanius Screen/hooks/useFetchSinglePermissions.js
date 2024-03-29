import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { PERMISSIONS_KEY } from "../miscellaneous.constant";
import { getSinglePermissions } from "../services/miscellaneous.services";

export const useFetchSinglePermissions = (id, screenType) => {
  return useQuery([PERMISSIONS_KEY.SINGLE_KEY, id], () =>
    screenType === "permission" && id && id !== ""
      ? getSinglePermissions(id)
      : {}
  );
};
