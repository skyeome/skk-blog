import type { BoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";

export interface CommentWriteProps {
  isEdit?: boolean;
  data?: Omit<BoardCommentData, "password">;
  onClickSubmit?: () => void;
  refetch?: () => void;
}
