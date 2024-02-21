import Head from "next/head";
import { loginCheck } from "../../../src/components/commons/hocs/loginCheck";
import BoardWrite from "../../../src/components/units/board/write/BoardWrite.index";

function BoardNewPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>새 글 작성 | 나만의 블로그</title>
      </Head>
      <BoardWrite />
    </>
  );
}

export default loginCheck(BoardNewPage);
