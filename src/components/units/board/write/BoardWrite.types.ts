import type { ChangeEvent } from "react";
import type { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard"> | undefined;
}
export interface IBoardWriteUIProps {
  isEdit: boolean;
  onClickWrite: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
  onChangeInputs: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  errors: IBoardWriteErrors;
  data?: Pick<IQuery, "fetchBoard"> | undefined;
}
export interface IBoardWriteInputs {
  writer: string;
  password: string;
  title: string;
  contents: string;
  youtubeUrl?: string;
}
export interface IBoardUpdateInputs {
  title: string;
  contents: string;
  youtubeUrl?: string;
}
export interface IBoardWriteErrors {
  id: string;
  message: string;
}
