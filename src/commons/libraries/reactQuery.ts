import { QueryClient } from "react-query";

const client = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 60000,
  //   },
  // },
});

export default client;
