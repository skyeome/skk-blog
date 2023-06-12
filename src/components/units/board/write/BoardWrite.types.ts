import type {
  ChangeEvent,
  JSXElementConstructor,
  ReactElement,
  RefObject,
} from "react";
import type { DocumentData } from "firebase/firestore";
// import type { IQuery } from "../../../../commons/types/generated/types";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { Editor } from "@toast-ui/react-editor";

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
  onChangeContents: () => void;
  onUploadImage: (
    blob: Blob | File,
    callback: (url: string, text?: string) => void
  ) => Promise<void>;
  editorRef: RefObject<Editor>;
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
