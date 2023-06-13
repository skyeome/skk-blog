import { UploadOutlined } from "@ant-design/icons";
import * as S from "./FileUpload.styles";
import type { IFileUploadUIProps } from "./FileUpload.types";

export default function FileUploadUI(props: IFileUploadUIProps): JSX.Element {
  return (
    <div>
      {props.fileUrl !== "" ? (
        <S.FileUploadWrap onClick={props.onClickUpload}>
          <img src={props.fileUrl} />
        </S.FileUploadWrap>
      ) : (
        <S.FileUploadWrap onClick={props.onClickUpload}>
          <p>
            <UploadOutlined rev={undefined} />
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
