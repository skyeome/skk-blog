import { useState } from "react";
import type { ChangeEvent } from "react";
import { Avatar, Input, Modal } from "antd";
import type { IBoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";
import * as S from "./CommentList.styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CommentWrite from "../write/CommentWrite.index";
import { useMutationDeleteComment } from "../../../../commons/hooks/mutations/useMutationDeleteComent";
import { useMutationUpdateComment } from "../../../../commons/hooks/mutations/useMutationUpdateComment";

export default function CommentListItem(props: {
  el: IBoardCommentData;
}): JSX.Element {
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  // const onClickEdit = (): void => {
  //   setIsOpenEdit(true);
  // };
  const onClickSubmit = (): void => {
    setIsEdit(false);
  };
  const { onClickEdit } = useMutationUpdateComment(
    props.el.id,
    password,
    setIsEdit,
    setErrMsg,
    setOpen,
    setIsOpenDelete
  );
  const { onClickDelete } = useMutationDeleteComment(
    props.el.id,
    password,
    setErrMsg,
    setOpen,
    setIsOpenDelete
  );

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };
  return (
    <>
      {isOpenEdit && (
        <Modal
          title="댓글 수정"
          open={open}
          onOk={() => {
            void onClickEdit();
            setPassword("");
          }}
          onCancel={() => {
            setOpen(false);
            setIsOpenEdit(false);
            setPassword("");
          }}
          okText="수정"
          cancelText="취소"
        >
          작성 시 설정한 비밀번호를 입력해주세요
          <Input.Password onChange={onChangePassword} />
          {errMsg !== "" && <p>{errMsg}</p>}
        </Modal>
      )}
      {isOpenDelete && (
        <Modal
          title="댓글 삭제"
          open={open}
          onOk={() => {
            void onClickDelete();
            setPassword("");
          }}
          onCancel={() => {
            setOpen(false);
            setIsOpenDelete(false);
            setPassword("");
          }}
          okText="삭제"
          cancelText="취소"
        >
          작성시 설정한 비밀번호를 입력해주세요
          <Input.Password onChange={onChangePassword} />
          {errMsg !== "" && <p>{errMsg}</p>}
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
              <EditOutlined
                onClick={() => {
                  setOpen(true);
                  setIsOpenEdit(true);
                }}
                rev={undefined}
              />
              <DeleteOutlined
                onClick={() => {
                  setOpen(true);
                  setIsOpenDelete(true);
                }}
                rev={undefined}
              />
            </S.CommentEditWrap>
          </>
        )}
      </S.CommentListItemWrap>
    </>
  );
}
