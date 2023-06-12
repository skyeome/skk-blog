import type { ChangeEvent } from "react";
import { useRef } from "react";
import FileUploadUI from "./FileUpload.presenter";
import { checkImageValidation } from "./FileUpload.validation";
import type { IFileUploadProps } from "./FileUpload.types";
// import { useMutation } from "@apollo/client";
// import { UPLOAD_FILE } from "./FileUpload.queries";
import { storage } from "../../../commons/libraries/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import type {
//   IMutation,
//   IMutationUploadFileArgs,
// } from "../../../commons/types/generated/types";

export default function FileUpload(props: IFileUploadProps): JSX.Element {
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
    const isValid = checkImageValidation(props.api, file);
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
      props.onChangeFileUrls(location ?? "", props.index);
    } catch (error) {
      if (error instanceof Error)
        props.api.error({
          message: error.message,
        });
    }
  };
  return (
    <FileUploadUI
      fileRef={fileRef}
      fileUrl={props.fileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
