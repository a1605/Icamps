import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

export const useQuery = (key) => {
  queryClient.invalidateQueries(key);
};
