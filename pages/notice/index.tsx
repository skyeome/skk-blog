import type { Editor } from "@toast-ui/react-editor";
import { notification } from "antd";
import dynamic from "next/dynamic";
import { useRef } from "react";

export default function NoticePage(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  const editorRef = useRef<Editor>(null);
  const Editor = dynamic(
    async () => await import("../../src/components/commons/editor/TuiEditor"),
    { ssr: false }
  );
  return (
    <>
      {contextHolder}
      <Editor api={api} editorRef={editorRef} />
    </>
  );
}
