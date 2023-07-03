import dynamic from "next/dynamic";
import { loginCheck } from "../../../src/components/commons/hocs/loginCheck";
// import BoardWrite from "../../../src/components/units/board/write/BoardWrite.index";

const BoardWrite = dynamic(
  async () =>
    await import("../../../src/components/units/board/write/BoardWrite.index"),
  { ssr: false }
);

function BoardNewPage(): JSX.Element {
  return <BoardWrite isEdit={false} />;
}

export default loginCheck(BoardNewPage);
