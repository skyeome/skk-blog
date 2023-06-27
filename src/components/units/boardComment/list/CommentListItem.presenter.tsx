import { useState } from "react";
import { Avatar } from "antd";
import type { IBoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";
import * as S from "./CommentList.styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CommentWrite from "../write/CommentWrite.index";
import { useMutationDeleteComment } from "../../../../commons/hooks/mutations/useMutationDeleteComent";

export default function CommentListItem(props: {
  el: IBoardCommentData;
}): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const onClickEdit = (): void => {
    setIsEdit(true);
  };
  const onClickSubmit = (): void => {
    setIsEdit(false);
  };
  const { onClickDelete } = useMutationDeleteComment(props.el.id);
  return (
    <S.CommentListItemWrap>
      {isEdit ? (
        <div style={{ width: "100%" }}>
          <CommentWrite
            isEdit={true}
            data={props.el}
            onClickSubmit={onClickSubmit}
          />
        </div>
      ) : (
        <>
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
            <EditOutlined onClick={onClickEdit} rev={undefined} />
            <DeleteOutlined onClick={onClickDelete} rev={undefined} />
          </S.CommentEditWrap>
        </>
      )}
    </S.CommentListItemWrap>
  );
}
