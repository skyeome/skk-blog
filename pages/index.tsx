import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IndexRatestList from "../src/components/units/index/ratest/IndexRatestList.container";
import HomeWrapper from "../src/components/units/index/index.styles";
import HomeTags from "../src/components/units/index/tags/HomeTags";

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
          <Stack alignItems="center">
            <Button variant="contained">
              <Link href="/free">게시글 더 보기</Link>
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <HomeTags />
        </Grid>
      </HomeWrapper>
    </>
  );
}
