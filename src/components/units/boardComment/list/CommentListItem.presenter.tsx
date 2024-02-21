import React, { useState } from "react";
import type { ChangeEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { BoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";
import CommentWrite from "../write/CommentWrite.index";
import { useMutationDeleteComment } from "../../../../commons/hooks/mutations/useMutationDeleteComent";
import { useMutationUpdateComment } from "../../../../commons/hooks/mutations/useMutationUpdateComment";
import * as S from "./CommentList.styles";

function CommentListItem(props: { el: BoardCommentData }): JSX.Element {
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // const [isOpenDelete, setIsOpenDelete] = useState(false);

  const onClickSubmit = (): void => {
    setIsEdit(false);
  };
  const { onClickEdit } = useMutationUpdateComment(
    props.el.id,
    password,
    setIsEdit,
    setErrMsg,
    setOpen,
    setIsOpenEdit
  );
  const { onClickDelete } = useMutationDeleteComment(
    props.el.id,
    password,
    setErrMsg,
    setOpen,
    setIsOpenEdit
  );

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpenEdit(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <S.CommentListItemWrap>
        {isEdit ? (
          <div style={{ width: "100%" }}>
            <CommentWrite
              isEdit
              data={props.el}
              onClickSubmit={onClickSubmit}
            />
          </div>
        ) : (
          <>
            <S.CommentAvatarWrap>
              <Avatar sx={{ bgcolor: "#f56a00" }}>
                {props.el.writer?.substring(0, 1).toUpperCase()}
              </Avatar>
            </S.CommentAvatarWrap>
            <S.CommentContentsWrap>
              <S.CommentHeader>
                <S.CommentWriter>{props.el.writer}</S.CommentWriter>
              </S.CommentHeader>
              <S.CommentContents>{props.el.contents}</S.CommentContents>
            </S.CommentContentsWrap>
            <S.CommentEditWrap>
              <IconButton
                size="small"
                onClick={() => {
                  setOpen(true);
                  setIsOpenEdit(true);
                  setErrMsg("");
                }}
              >
                <ModeEditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  setOpen(true);
                  setIsOpenEdit(false);
                  setErrMsg("");
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </S.CommentEditWrap>
          </>
        )}
      </S.CommentListItemWrap>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isOpenEdit ? "댓글 수정" : "댓글 삭제"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            작성 시 설정한 비밀번호를 입력해주세요
          </DialogContentText>
          <FormControl variant="outlined" sx={{ mt: 2 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              비밀번호
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="비밀번호"
            />
          </FormControl>
          {errMsg !== "" && <Typography>{errMsg}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            color="error"
            onClick={() => {
              if (isOpenEdit) void onClickEdit();
              else void onClickDelete();
              setPassword("");
            }}
            autoFocus
          >
            {isOpenEdit ? "수정" : "삭제"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default React.memo(CommentListItem);
