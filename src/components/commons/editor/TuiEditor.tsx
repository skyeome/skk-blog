import type { RefObject } from "react";
// import { useRef } from "react";
// import type { SetStateAction } from "react";
import { Editor } from "@toast-ui/react-editor";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../commons/libraries/firebase";
import { checkImageValidation } from "../upload/FileUpload.validation";
import type { ShowToastParams } from "../../../commons/hooks/custom/useToast";
import "@toast-ui/editor/dist/toastui-editor.css";

interface IEditorProps {
  showToast: ShowToastParams;
  initialValue?: string;
  editorRef: RefObject<Editor>;
}

export default function TuiEditor({
  showToast,
  initialValue,
  editorRef,
}: IEditorProps): JSX.Element {
  const onUploadImage = async (
    blob: Blob | File,
    callback: (url: string, text?: string) => void
  ): Promise<void> => {
    if (blob instanceof File) {
      const isValid = checkImageValidation(showToast, blob);
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
        if (error instanceof Error) showToast("error", error.message);
      }
    }
  };
  return (
    <Editor
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      initialValue={initialValue ?? ""}
      ref={editorRef}
      hooks={{ addImageBlobHook: onUploadImage }}
    />
  );
}
