import type { ChangeEvent, JSXElementConstructor, ReactElement } from "react";
import type { DocumentData } from "firebase/firestore";
// import type { IQuery } from "../../../../commons/types/generated/types";
import type { NotificationInstance } from "antd/es/notification/interface";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: DocumentData;
}
export interface IBoardWriteUIProps {
  isEdit: boolean;
  onClickWrite: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
  onChangeInputs: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onChangeFileUrls: (fileUrls: string, index: number) => void;
  errors: IBoardWriteErrors;
  data?: DocumentData;
  fileUrls: string[];
  api: NotificationInstance;
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>;
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
