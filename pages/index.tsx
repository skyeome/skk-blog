import Head from "next/head";
import IndexRatestList from "../src/components/units/index/ratest/IndexRatestList.container";
import HomeWrapper from "../src/components/units/index/index.styles";
import HomeTags from "../src/components/units/index/tags/HomeTags";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>나만의 블로그</title>
      </Head>
      <HomeWrapper>
        <IndexRatestList />
        <HomeTags />
      </HomeWrapper>
    </>
  );
}
