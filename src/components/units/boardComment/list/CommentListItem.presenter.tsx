import type { IBoardComment } from "../../../../commons/types/generated/types";
import * as S from "./CommentList.styles";

export default function CommentListItem(props: {
  el: IBoardComment;
}): JSX.Element {
  return (
    <>
      <S.CommentWriter>{props.el.writer}</S.CommentWriter>
      <S.CommentContents>{props.el.contents}</S.CommentContents>
    </>
  );
}
