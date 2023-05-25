import type { IBoardCommentListUIProps } from "./CommentList.types";
import CommentListItem from "./CommentListItem.presenter";

export default function CommentListUI(
  props: IBoardCommentListUIProps
): JSX.Element {
  return (
    <>
      {props.data?.fetchBoardComments.map((el) => (
        <CommentListItem el={el} />
      ))}
    </>
  );
}
