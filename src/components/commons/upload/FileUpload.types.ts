import type { ChangeEvent, RefObject } from "react";
import type { ShowToastParams } from "../../../commons/hooks/custom/useToast";
export interface IFileUploadProps {
  showToast: ShowToastParams;
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
