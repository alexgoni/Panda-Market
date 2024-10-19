import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "context/user";
import useDeviceState from "hooks/useDeviceState";

import Router from "./Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

export default function App() {
  useDeviceState();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
    </QueryClientProvider>
  );
}
