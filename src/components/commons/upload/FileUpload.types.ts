import type { ChangeEvent } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { ShowToastParams } from "../../../commons/hooks/custom/useToast";
import type { IBoardWriteInputTypes } from "../../units/board/write/BoardWrite.types";
export interface IFileUploadProps {
  showToast: ShowToastParams;
  fileUrl: string | undefined;
  setFileUrl: (fileUrl: string) => void;
  setValue: UseFormSetValue<IBoardWriteInputTypes>;
}
export interface IFileUploadUIProps {
  fileUrl: string | undefined;
  onClickUpload: (e: React.MouseEvent<HTMLElement>) => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
