import type { NotificationInstance } from "antd/es/notification/interface";
import type { ChangeEvent, RefObject } from "react";
export interface IFileUploadProps {
  api: NotificationInstance;
  fileUrl: string;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
  index: number;
}
export interface IFileUploadUIProps {
  fileRef: RefObject<HTMLInputElement>;
  fileUrl: string;
  onClickUpload: () => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
