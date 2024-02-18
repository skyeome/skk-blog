import Head from "next/head";
import Divider from "@mui/material/Divider";
import MyInfo from "../../src/components/units/mypage/MyInfo";
import Grid from "@mui/material/Grid";
import HomeTags from "../../src/components/units/index/tags/HomeTags";
import IndexRatestListUI from "../../src/components/units/index/ratest/IndexRatestList.presenter";
import { useQueries } from "react-query";
import { getMyInfo, getMyRatestData } from "../../src/commons/apis/mypage";
import { useRecoilValue } from "recoil";
import { userState } from "../../src/commons/stores";

function Mypage() {
  const user = useRecoilValue(userState);
  if (user === null) return <div>loading...</div>;
  const result = useQueries([
    {
      queryKey: ["mypage", "userInfo"],
      queryFn: async () => await getMyInfo(user.uid),
    },
    {
      queryKey: ["mypage", "ratestData"],
      queryFn: async () => await getMyRatestData(user.uid),
    },
  ]);
  return (
    <>
      <Head>
        <title>마이페이지</title>
      </Head>
      <MyInfo data={result[0].data} />
      <Divider />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 0, sm: 2, md: 3 }}
        pt={5}
      >
        <Grid item xs={12} md={9}>
          <IndexRatestListUI title="내가 작성한 글" data={result[1].data} />
        </Grid>
        <Grid item xs={12} md={3}>
          <HomeTags />
        </Grid>
      </Grid>
    </>
  );
}

export default Mypage;
