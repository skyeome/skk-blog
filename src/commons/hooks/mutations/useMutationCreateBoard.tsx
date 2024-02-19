import { useState, useEffect } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/router";
import type { Control, FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { DocumentData } from "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import type {
  IBoardUpdateInputs,
  IBoardWriteInputTypes,
} from "../../../components/units/board/write/BoardWrite.types";
import { db, auth } from "../../libraries/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { boardWriteSchema } from "../../libraries/yup";
import type { Editor } from "@toast-ui/react-editor";
import type { ShowToastParams } from "../custom/useToast";
import MarkdownIt from "markdown-it";

export const useMutationCreateBoard = (
  showToast: ShowToastParams,
  editorRef: RefObject<Editor>,
  data?: DocumentData | undefined
): {
  control: Control<IBoardWriteInputTypes, any>;
  errors: FieldErrors<IBoardWriteInputTypes>;
  fileUrls: string[];
  onChangeFileUrls: (fileUrl: string, index: number) => void;
  onClickWrite: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
} => {
  // const editorRef = useRef<Editor>(null);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IBoardWriteInputTypes>({
    resolver: yupResolver(boardWriteSchema),
  });
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  useEffect(() => {
    const images = data?.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [data]);

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  const onClickWrite = handleSubmit((inputs: IBoardWriteInputTypes) => {
    const user = auth.currentUser;
    if (user === null || user === undefined) return;

    const currentCategory = JSON.stringify(inputs.category);
    const emptyCategory = JSON.stringify([]);
    const notEmptyCategory = currentCategory !== emptyCategory;

    const markdown = editorRef.current?.getInstance().getMarkdown();
    // 요약글 만들기
    const md = new MarkdownIt();
    const htmlText = md.render(markdown ?? "");
    let summary = new DOMParser().parseFromString(htmlText, "text/html").body
      .textContent;
    if (summary !== null && summary.length > 100) {
      summary = summary.substring(0, 100);
    }
    if (inputs.title !== undefined && notEmptyCategory && markdown !== "") {
      addDoc(collection(db, "Board"), {
        writer: user.uid,
        title: inputs.title,
        category: inputs.category,
        contents: markdown,
        summary,
        images: [...fileUrls],
        createdAt: serverTimestamp(),
      })
        .then((result) => {
          void router.push(`/free/${String(result.id)}`);
        })
        .catch((error) => {
          if (error instanceof Error) showToast("error", error.message);
        });
    }
  });

  const onClickUpdate = handleSubmit((inputs: IBoardWriteInputTypes) => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(data?.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    const currentCategory = JSON.stringify(inputs.category);
    const emptyCategory = JSON.stringify([]);
    const notEmptyCategory = currentCategory !== emptyCategory;

    const markdown = editorRef.current?.getInstance().getMarkdown();
    // 요약글 만들기
    const md = new MarkdownIt();
    const htmlText = md.render(markdown ?? "");
    let summary = new DOMParser().parseFromString(htmlText, "text/html").body
      .textContent;
    if (summary !== null && summary.length > 100) {
      summary = summary.substring(0, 100);
    }
    if (inputs.title === "" && notEmptyCategory && markdown === "") {
      alert("수정한 내용이 없습니다.");
      return;
    }

    const updateBoardInput: IBoardUpdateInputs = {};
    if (inputs.title !== undefined) updateBoardInput.title = inputs.title;
    if (inputs.category !== undefined && notEmptyCategory)
      updateBoardInput.category = inputs.category;
    if (summary !== null) updateBoardInput.summary = summary;
    if (markdown !== "") updateBoardInput.contents = markdown;
    if (isChangedFiles) updateBoardInput.images = fileUrls;
    if (typeof router.query.boardId !== "string") {
      showToast("error", "시스템에 문제가 있습니다.");
      return;
    }

    const ref = doc(db, "Board", router.query.boardId);

    updateDoc(ref, {
      ...updateBoardInput,
      updatedAt: serverTimestamp(),
    })
      .then((docRef) => {
        void router.push(`/free/${router.query.boardId as string}`);
      })
      .catch((error) => {
        if (error instanceof Error) showToast("error", error.message);
      });
  });

  return {
    control,
    errors,
    fileUrls,
    onChangeFileUrls,
    onClickWrite,
    onClickUpdate,
  };
};
