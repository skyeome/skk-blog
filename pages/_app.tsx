import ApolloSetting from "../src/components/commons/apollo";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyle } from "../src/commons/styles/globalStyles";
import Layout from "../src/components/commons/layout";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloSetting>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </ApolloSetting>
  );
}
