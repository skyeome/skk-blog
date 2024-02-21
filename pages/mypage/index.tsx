import Head from "next/head";
import { useQueries } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../../src/commons/stores";
import { loginCheck } from "../../src/components/commons/hocs/loginCheck";
import { getMyInfo, getMyRatestData } from "../../src/commons/apis/mypage";
import Divider from "@mui/material/Divider";
import MyInfo from "../../src/components/units/mypage/MyInfo";
import Grid from "@mui/material/Grid";
import IndexRatestListUI from "../../src/components/units/index/ratest/IndexRatestList.presenter";
import HomeTags from "../../src/components/units/index/tags/HomeTags";
import useSearchParam from "../../src/commons/hooks/custom/useSearchParam";
import ItemNone from "../../src/components/commons/layout/none/ItemNone";

function Mypage() {
  const tag = useSearchParam("tag");

  const user = useRecoilValue(userState);
  const result = useQueries([
    {
      queryKey: ["mypage", "userInfo"],
      queryFn: async () => await getMyInfo(user?.uid),
    },
    {
      queryKey: ["mypage", "ratestData", tag === "" ? "all" : tag],
      queryFn: async () => await getMyRatestData(user?.uid, tag),
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
          {result[1].data?.length === 0 ? (
            <ItemNone />
          ) : (
            <IndexRatestListUI
              title="내가 작성한 글"
              data={result[1].data}
              isLoading={result[1].isLoading}
            />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <HomeTags isMyTag />
        </Grid>
      </Grid>
    </>
  );
}

export default loginCheck(Mypage);
