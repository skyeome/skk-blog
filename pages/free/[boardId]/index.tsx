// import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.index";
import CommentWrite from "../../../src/components/units/boardComment/write/CommentWrite.index";
import CommentList from "../../../src/components/units/boardComment/list/CommentList.index";
import dynamic from "next/dynamic";

const BoardDetail = dynamic(
  async () =>
    await import(
      "../../../src/components/units/board/detail/BoardDetail.index"
    ),
  { ssr: false }
);
export default function BoardDetailPage(): JSX.Element {
  return (
    <>
      <BoardDetail />
      <CommentWrite isEdit={false} />
      <CommentList />
    </>
  );
}
