import { Avatar } from "antd";
import type { IBoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";
import * as S from "./CommentList.styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function CommentListItem(props: {
  el: IBoardCommentData;
}): JSX.Element {
  return (
    <S.CommentListItemWrap>
      <S.CommentAvatarWrap>
        <Avatar
          style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
          size="large"
          gap={4}
        >
          {props.el.writer?.substring(0, 1)}
        </Avatar>
      </S.CommentAvatarWrap>
      <S.CommentContentsWrap>
        <S.CommentHeader>
          <S.CommentWriter>{props.el.writer}</S.CommentWriter>
        </S.CommentHeader>
        <S.CommentContents>{props.el.contents}</S.CommentContents>
      </S.CommentContentsWrap>
      <S.CommentEditWrap>
        <EditOutlined rev={undefined} />
        <DeleteOutlined rev={undefined} />
      </S.CommentEditWrap>
    </S.CommentListItemWrap>
  );
}
