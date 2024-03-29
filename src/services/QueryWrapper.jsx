import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      if (err?.response.status === 401) {
        localStorage.clear();
        location.href = "/";
      } else if (err?.response.status === 403) {
        location.href = "/access-dined";
      }
    },
  }),
});

const QueryWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default QueryWrapper;
