import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import _ from "lodash";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useMutateBoard } from "../../../../commons/hooks/queries/useQueryFetchBoard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { userState } from "../../../../commons/stores";
import { useBoardLike } from "../../../../commons/hooks/custom/useBoardLike";
import Toast from "../../../commons/layout/toast/Toast";
import useToast from "../../../../commons/hooks/custom/useToast";
import type { BoardDetailProps } from "./BoardDetail.types";
import * as S from "./BoardDetail.styles";
import "@toast-ui/editor/dist/toastui-editor.css";

const Viewer = dynamic(
  async () => await import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  { ssr: false }
);

export default function BoardDetail({ data }: BoardDetailProps): JSX.Element {
  const router = useRouter();
  const { openToast, severity, messageToast, closeToast, showToast } =
    useToast();
  const {
    onClickEditBtn,
    onClickDeleteBtn,
    open,
    handleClickOpen,
    handleClose,
  } = useMutateBoard(router, data, showToast);
  const [user] = useRecoilState(userState);
  const { likeCount, liked, onClickLikeBtn } = useBoardLike(showToast);
  return (
    <>
      <Head>
        <title>{data.title} | 자유게시판</title>
      </Head>
      <S.topKvBox>
        <S.topKvCategory>자유게시판</S.topKvCategory>
        <S.topKvTitle>{data.title}</S.topKvTitle>
        <S.topKvInfos>
          <Typography variant="caption" color="GrayText" mr={1}>
            <PersonOutlineIcon fontSize="small" />
            {data.writer}
          </Typography>
          <Typography variant="caption" color="GrayText">
            <AccessTimeIcon fontSize="small" />
            {format(data.createdAt.toDate(), "yyyy. MM. dd", {
              locale: ko,
            })}
          </Typography>
        </S.topKvInfos>
      </S.topKvBox>
      {data.thumb !== undefined && (
        <S.topThumb>
          <Image src={data.thumb} layout="fill" objectFit="contain" />
        </S.topThumb>
      )}
      <Box sx={{ overflow: "hidden" }}>
        <Viewer initialValue={data.contents} />
      </Box>
      <S.BoardLikeWrap>
        <S.BoardLikeCount>{likeCount}</S.BoardLikeCount>
        <S.BoardLikeBtn onClick={_.debounce(onClickLikeBtn, 300)}>
          {liked ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}{" "}
          좋아요!
        </S.BoardLikeBtn>
      </S.BoardLikeWrap>
      {user?.uid === data.uid ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mb: 6 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<DeleteIcon />}
            onClick={onClickEditBtn}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error"
            sx={{ ml: 1 }}
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen}
          >
            삭제
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 3, mb: 6 }} />
      )}
      <Toast
        open={openToast}
        severity={severity}
        message={messageToast}
        closeToast={closeToast}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">게시글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            게시글을 삭제하시겠습니까? 삭제한 게시글은 복구가 불가능합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button color="error" onClick={onClickDeleteBtn} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
