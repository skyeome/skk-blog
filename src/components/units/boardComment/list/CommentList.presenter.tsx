import { Divider } from "antd";
import type { IBoardCommentListUIProps } from "./CommentList.types";
import CommentListItem from "./CommentListItem.presenter";

export default function CommentListUI(
  props: IBoardCommentListUIProps
): JSX.Element {
  return (
    <>
      <Divider>{props.data?.fetchBoardComments.length} Comments</Divider>
      {props.data?.fetchBoardComments.map((el) => (
        <CommentListItem key={el._id} el={el} />
      ))}
    </>
  );
}
