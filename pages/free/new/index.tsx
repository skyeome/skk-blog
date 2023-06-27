import { loginCheck } from "../../../src/components/commons/hocs/loginCheck";
import BoardWrite from "../../../src/components/units/board/write/BoardWrite.index";

function BoardNewPage(): JSX.Element {
  return <BoardWrite isEdit={false} />;
}

export default loginCheck(BoardNewPage);
