import type { ChangeEvent } from "react";
import type { ShowToastParams } from "../../../commons/hooks/custom/useToast";
export interface IFileUploadProps {
  showToast: ShowToastParams;
  fileUrl: string | undefined;
  setFileUrl: (fileUrl: string) => void;
  // index: number;
}
export interface IFileUploadUIProps {
  fileUrl: string | undefined;
  onClickUpload: (e: React.MouseEvent<HTMLElement>) => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
