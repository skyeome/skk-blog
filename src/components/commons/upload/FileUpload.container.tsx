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
  onChangeFileUrls,
  index,
}: IFileUploadProps): JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);
  // const [uploadFile] = useMutation<
  //   Pick<IMutation, "uploadFile">,
  //   IMutationUploadFileArgs
  // >(UPLOAD_FILE);
  const onClickUpload = (): void => {
    fileRef.current?.click();
  };
  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    const isValid = checkImageValidation(showToast, file);
    if (!isValid) return;
    try {
      const storageRef = ref(storage, `images/${file?.name ?? "file"}`);
      if (typeof file === "undefined") return;
      const uploadRef = await uploadBytes(storageRef, file).then(
        (snapshot) => snapshot.ref
      );
      const location = await getDownloadURL(uploadRef).then(
        (downloadUrl) => downloadUrl
      );
      // const result = await uploadFile({ variables: { file } });
      onChangeFileUrls(location ?? "", index);
    } catch (error) {
      if (error instanceof Error) showToast("error", error.message);
    }
  };
  return (
    <FileUploadUI
      fileRef={fileRef}
      fileUrl={fileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
