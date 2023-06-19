import Head from "next/head";
import BoardList from "../../src/components/units/board/list/BoardList.container";

export default function FreeBoardPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>자유게시판</title>
      </Head>
      <BoardList />
    </>
  );
}
