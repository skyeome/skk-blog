import { useState } from "react";
import { Avatar, Input, Modal } from "antd";
import type { IBoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";
import * as S from "./CommentList.styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CommentWrite from "../write/CommentWrite.index";
import { useMutationDeleteComment } from "../../../../commons/hooks/mutations/useMutationDeleteComent";

export default function CommentListItem(props: {
  el: IBoardCommentData;
}): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const onClickEdit = (): void => {
    // setIsEdit(true);
    setIsOpenEdit(true);
  };
  const onClickSubmit = (): void => {
    setIsEdit(false);
  };
  const { onClickDelete } = useMutationDeleteComment(props.el.id);
  return (
    <>
      {isOpenEdit && (
        <Modal
          title="비밀번호를 입력해주세요"
          open={true}
          onOk={() => {
            setIsOpenEdit(false);
          }}
          onCancel={() => {
            setIsOpenEdit(false);
          }}
          okText="수정"
          cancelText="취소"
        >
          <Input />
        </Modal>
      )}
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
    </>
  );
}
