import Head from "next/head";
import IndexRatestList from "../src/components/units/index/ratest/IndexRatestList.container";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>나만의 블로그</title>
      </Head>
      <IndexRatestList />
    </>
  );
}
