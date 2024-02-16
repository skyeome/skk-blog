import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { IFileUploadUIProps } from "./FileUpload.types";
import * as S from "./FileUpload.styles";

export default function FileUploadUI(props: IFileUploadUIProps): JSX.Element {
  return (
    <div>
      {props.fileUrl !== "" ? (
        <S.FileUploadWrap onClick={props.onClickUpload}>
          <Image src={props.fileUrl} layout="fill" />
        </S.FileUploadWrap>
      ) : (
        <S.FileUploadWrap onClick={props.onClickUpload}>
          <p>
            <CloudUploadIcon fontSize="small" />
            <br />
            파일 업로드
          </p>
        </S.FileUploadWrap>
      )}
      <S.HidedInput
        type="file"
        ref={props.fileRef}
        onChange={props.onChangeFile}
      />
    </div>
  );
}
