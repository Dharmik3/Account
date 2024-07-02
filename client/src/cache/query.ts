import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});
