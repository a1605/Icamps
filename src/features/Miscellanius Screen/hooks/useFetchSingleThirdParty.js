import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { THIRD_PARTY_KEY } from "../miscellaneous.constant";
import { getSingleThirdParty } from "../services/miscellaneous.services";

export const useFetchSingleThirdParty = (id, screenType) => {
  return useQuery([THIRD_PARTY_KEY.SINGLE_KEY, id], () =>
    screenType === "libraries" && id && id !== "" ? getSingleThirdParty(id) : {}
  );
};
