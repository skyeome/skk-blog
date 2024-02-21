import type { BoardComment } from "../../../../commons/libraries/firestore";

export interface CommentWriteProps {
  isEdit?: boolean;
  data?: BoardComment;
  onClickSubmit?: () => void;
  refetch?: () => void;
}
