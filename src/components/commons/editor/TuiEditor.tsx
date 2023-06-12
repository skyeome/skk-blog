import type { RefObject } from "react";
import { Editor } from "@toast-ui/react-editor";

interface IEditorProps {
  initialValue: string;
  editorRef: RefObject<Editor>;
  onChangeContents: () => void;
  onUploadImage: (
    blob: Blob | File,
    callback: (url: string, text?: string) => void
  ) => Promise<void>;
}

export default function TuiEditor(props: IEditorProps): JSX.Element {
  return (
    <Editor
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      initialValue={props.initialValue}
      ref={props.editorRef}
      onChange={props.onChangeContents}
      hooks={{ addImageBlobHook: props.onUploadImage }}
    />
  );
}
