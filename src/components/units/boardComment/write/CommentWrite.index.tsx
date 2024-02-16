import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useQueryIdCheck } from "../../../../commons/hooks/custom/useQueryIdCheck";
import type { ICommentValues } from "../../../../commons/hooks/custom/useBoardComment";
import { useBoardComment } from "../../../../commons/hooks/custom/useBoardComment";
import type { IBoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";
import { Textarea } from "./CommentWrite.styles";

interface ICommentWriteProps {
  isEdit: boolean;
  data?: Omit<IBoardCommentData, "password">;
  onClickSubmit?: () => void;
  refetch?: () => void;
}

export default function CommentWrite(props: ICommentWriteProps): JSX.Element {
  const { id } = useQueryIdCheck("boardId");
  const { handleSubmit, setValue, reset, control, formState } =
    useForm<ICommentValues>({
      defaultValues: {
        writer: props.data?.writer ?? "",
        contents: props.data?.contents ?? "",
        star: props.data?.star ?? 0,
      },
    });
  const { onClickWrite, onClickUpdate, setRating } = useBoardComment({
    boardId: id,
    commentId: props.data?.id,
    formState,
    setValue,
    reset,
    onClickSubmit: props.onClickSubmit,
    refetch: props.refetch,
  });
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Controller
            name="writer"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  label="닉네임"
                  variant="standard"
                  onChange={onChange}
                  value={value}
                  disabled={props.isEdit}
                  margin="none"
                  fullWidth
                />
              </Box>
            )}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  type="password"
                  label="비밀번호"
                  variant="standard"
                  onChange={onChange}
                  value={value}
                  margin="none"
                  fullWidth
                />
              </Box>
            )}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Box sx={{ mt: 2 }}>
            <Rating onChange={setRating} defaultValue={props.data?.star ?? 0} />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        <Controller
          name="contents"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Textarea
              minRows={3}
              onChange={onChange}
              value={value}
              placeholder="내용을 작성해주세요."
            />
          )}
        />
      </Box>
      <Box mb={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          onClick={
            props.isEdit
              ? handleSubmit(onClickUpdate)
              : handleSubmit(onClickWrite)
          }
        >
          {props.isEdit ? "댓글 수정하기" : "댓글 남기기"}
        </Button>
      </Box>
    </>
  );
}
