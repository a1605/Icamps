import { useQuery } from "@tanstack/react-query";
import { getSingleAbout } from "../service/about-service";

export const useFetchSingleAbout = (id) => {
  if (id && id !== "") return useQuery(["get-About"], () => getSingleAbout(id));
};
