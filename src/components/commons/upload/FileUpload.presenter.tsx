import React from "react";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { IFileUploadUIProps } from "./FileUpload.types";
import * as S from "./FileUpload.styles";

const FileUploadUI = React.forwardRef<HTMLInputElement, IFileUploadUIProps>(
  (props, ref) => {
    return (
      <div>
        <S.FileUploadWrap onClick={props.onClickUpload}>
          {props.fileUrl !== undefined ? (
            <Image src={props.fileUrl} layout="fill" />
          ) : (
            <p>
              <CloudUploadIcon fontSize="small" />
              <br />
              파일 업로드
            </p>
          )}
        </S.FileUploadWrap>
        <S.HidedInput type="file" ref={ref} onChange={props.onChangeFile} />
      </div>
    );
  }
);

export default FileUploadUI;
