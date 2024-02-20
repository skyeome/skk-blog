import type { ChangeEvent } from "react";
import { useRef } from "react";
import FileUploadUI from "./FileUpload.presenter";
import { checkImageValidation } from "./FileUpload.validation";
import type { IFileUploadProps } from "./FileUpload.types";
import { storage } from "../../../commons/libraries/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function FileUpload({
  showToast,
  fileUrl,
  setFileUrl,
  setValue,
}: IFileUploadProps): JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);
  // upload 강제로 누르는 함수
  const onClickUpload = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    fileRef.current?.click();
  };
  // input의 파일이 변경될때 실행
  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target?.files === null || event.target?.files[0] === null) return;
    const file = event.target.files[0];
    const isValid = checkImageValidation(showToast, file);

    if (!isValid) return;
    if (file === undefined) return;
    try {
      const timestamp = new Date().getTime(); // 현재 시간을 밀리초로 변환
      const fileName = `${file?.name ?? "file"}_${timestamp}`;
      const storageRef = ref(storage, `images/${fileName}`);
      // 파일을 업로드 합니다.
      const uploadRef = await uploadBytes(storageRef, file);
      const location = await getDownloadURL(uploadRef.ref);
      // 업로드 완료 후 fileurl 변경
      setFileUrl(location);
      setValue("thumbRef", fileName);
    } catch (error) {
      if (error instanceof Error) showToast("error", error.message);
    }
    // 파일 초기화!
    if (fileRef.current !== null) fileRef.current.value = "";
  };
  return (
    <FileUploadUI
      ref={fileRef}
      fileUrl={fileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
