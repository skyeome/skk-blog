import Head from "next/head";
import IndexRatestList from "../src/components/units/index/ratest/IndexRatestList.container";
import HomeWrapper from "../src/components/units/index/index.styles";
import HomeTags from "../src/components/units/index/tags/HomeTags";
import { Grid } from "@mui/material";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>나만의 블로그</title>
      </Head>
      <HomeWrapper
        container
        rowSpacing={1}
        columnSpacing={{ xs: 0, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={9}>
          <IndexRatestList />
        </Grid>
        <Grid item xs={12} md={3}>
          <HomeTags />
        </Grid>
      </HomeWrapper>
    </>
  );
}
