import { useState } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import type { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import MarkdownIt from "markdown-it";
import { db, auth } from "../../libraries/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { boardWriteSchema } from "../../libraries/yup";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import type {
  BoardUpdateInputs,
  BoardWriteInputTypes,
} from "../../../components/units/board/write/BoardWrite.types";
import type { BoardDetail } from "../../libraries/firestore";
import type { Editor } from "@toast-ui/react-editor";
import type { ShowToastParams } from "../custom/useToast";
import { deleteImage } from "../../apis/mypage";

export const useMutationCreateBoard = (
  showToast: ShowToastParams,
  editorRef: RefObject<Editor>,
  data?: BoardDetail | undefined
): {
  control: Control<BoardWriteInputTypes, any>;
  errors: FieldErrors<BoardWriteInputTypes>;
  fileUrl: string | undefined;
  setFileUrl: (fileUrl: string) => void;
  setValue: UseFormSetValue<BoardWriteInputTypes>;
  onClickWrite: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
} => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<BoardWriteInputTypes>({
    resolver: yupResolver(boardWriteSchema),
  });
  const [fileUrl, setFileUrl] = useState<string | undefined>(data?.thumb);

  const onClickWrite = handleSubmit((inputs: BoardWriteInputTypes) => {
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
        thumb: fileUrl ?? "",
        thumbRef: inputs.thumbRef ?? "",
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

  const onClickUpdate = handleSubmit((inputs: BoardWriteInputTypes) => {
    const currentFiles = fileUrl;
    const defaultFiles = data?.thumb;
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

    const updateBoardInput: BoardUpdateInputs = {};
    if (inputs.title !== undefined) updateBoardInput.title = inputs.title;
    if (inputs.category !== undefined && notEmptyCategory)
      updateBoardInput.category = inputs.category;
    if (summary !== null) updateBoardInput.summary = summary;
    if (markdown !== "") updateBoardInput.contents = markdown;
    // 파일이 이전과 달라졌으면
    if (isChangedFiles) {
      updateBoardInput.thumb = fileUrl;
      updateBoardInput.thumbRef = inputs.thumbRef;
    }
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
    if (isChangedFiles && data?.thumbRef !== undefined) {
      deleteImage(data.thumbRef).catch((error) => {
        showToast("error", error.message);
      });
    }
  });

  return {
    control,
    errors,
    fileUrl,
    setFileUrl,
    setValue,
    onClickWrite,
    onClickUpdate,
  };
};
