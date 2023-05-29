import { Avatar } from "antd";
import type { IBoardComment } from "../../../../commons/types/generated/types";
import * as S from "./CommentList.styles";

export default function CommentListItem(props: {
  el: IBoardComment;
}): JSX.Element {
  return (
    <S.CommentListItemWrap>
      <div style={{ display: "flex" }}>
        <div>
          <Avatar
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            size="large"
            gap={4}
          >
            {props.el.writer?.substring(0, 1)}
          </Avatar>
        </div>
        <div>
          <S.CommentHeader>
            <S.CommentWriter>{props.el.writer}</S.CommentWriter>
          </S.CommentHeader>
          <S.CommentContents>{props.el.contents}</S.CommentContents>
        </div>
      </div>
    </S.CommentListItemWrap>
  );
}
