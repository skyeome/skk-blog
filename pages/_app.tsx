import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyle } from "../src/commons/styles/globalStyles";
import Layout from "../src/components/commons/layout";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import client from "../src/commons/libraries/reactQuery";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
