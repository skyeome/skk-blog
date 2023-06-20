import type { RefObject } from "react";
// import { useRef } from "react";
// import type { SetStateAction } from "react";
import { Editor } from "@toast-ui/react-editor";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../commons/libraries/firebase";
import { checkImageValidation } from "../upload/FileUpload.validation";
import type { NotificationInstance } from "antd/es/notification/interface";
import "@toast-ui/editor/dist/toastui-editor.css";

interface IEditorProps {
  api: NotificationInstance;
  initialValue?: string;
  editorRef: RefObject<Editor>;
  // setContents: (value: SetStateAction<string>) => void;
}

export default function TuiEditor(props: IEditorProps): JSX.Element {
  // const editorRef = useRef<Editor>(null);

  // const onChangeContents = (): void => {
  //   const editorIns = editorRef.current?.getInstance();
  //   const mkdown = editorIns?.getMarkdown();
  //   props.setContents(mkdown ?? "");
  // };

  const onUploadImage = async (
    blob: Blob | File,
    callback: (url: string, text?: string) => void
  ): Promise<void> => {
    if (blob instanceof File) {
      const isValid = checkImageValidation(props.api, blob);
      if (!isValid) return;
      try {
        const storageRef = ref(storage, `images/${blob?.name ?? "file"}`);
        const uploadRef = await uploadBytes(storageRef, blob).then(
          (snapshot) => snapshot.ref
        );
        const url = await getDownloadURL(uploadRef).then(
          (downloadUrl) => downloadUrl
        );
        callback(url, blob?.name);
      } catch (error) {
        if (error instanceof Error)
          props.api.error({
            message: error.message,
          });
      }
    }
  };
  return (
    <Editor
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      initialValue={props.initialValue ?? ""}
      ref={props.editorRef}
      // onChange={onChangeContents}
      hooks={{ addImageBlobHook: onUploadImage }}
    />
  );
}
