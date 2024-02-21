import type { BoardDetail } from "../../../../commons/libraries/firestore";

export interface BoardWriteProps {
  isEdit?: boolean;
  data?: BoardDetail;
}
export interface BoardUpdateInputs {
  title?: string;
  summary?: string;
  contents?: string;
  category?: string[];
  thumb?: string;
  thumbRef?: string;
}

export interface BoardWriteInputTypes {
  title?: string | undefined;
  category?: any[] | undefined;
  thumbRef?: string;
}
