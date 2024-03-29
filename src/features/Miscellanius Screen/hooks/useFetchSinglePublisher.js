import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { APP_PUBLISHER_KEY } from "../miscellaneous.constant";
import { getSingleAppPublisher } from "../services/miscellaneous.services";

export const useFetchSinglePublisher = (id, screenType) => {
  return useQuery([APP_PUBLISHER_KEY.SINGLE_KEY, id], () =>
    screenType === "publisher" && id && id !== ""
      ? getSingleAppPublisher(id)
      : {}
  );
};
