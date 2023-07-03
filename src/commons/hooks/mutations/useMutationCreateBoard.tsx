import type { DocumentData } from "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import type { RefObject } from "react";
import { useState, useEffect } from "react";
import type {
  IBoardUpdateInputs,
  IBoardWriteInputTypes,
} from "../../../components/units/board/write/BoardWrite.types";
import { db, auth } from "../../libraries/firebase";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { Control, FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { boardWriteSchema } from "../../libraries/yup";
import type { Editor } from "@toast-ui/react-editor";

export const useMutationCreateBoard = (
  api: NotificationInstance,
  editorRef: RefObject<Editor>,
  data?: DocumentData | undefined
): {
  control: Control<IBoardWriteInputTypes, any>;
  errors: FieldErrors<IBoardWriteInputTypes>;
  fileUrls: string[];
  // onChangeContents: () => void;
  // onUploadImage: (
  //   blob: Blob | File,
  //   callback: (url: string, text?: string) => void
  // ) => Promise<void>;
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
  // const [contents, setContents] = useState<string>("");
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

  // const onChangeContents = (): void => {
  //   const mkdown = editorRef.current?.getInstance().getMarkdown();
  //   console.log(mkdown);
  //   if (typeof mkdown === "undefined") return;
  //   setContents(mkdown);
  // };

  // const onUploadImage = async (
  //   blob: Blob | File,
  //   callback: (url: string, text?: string) => void
  // ): Promise<void> => {
  //   console.log(blob);
  //   if (blob instanceof File) {
  //     const isValid = checkImageValidation(api, blob);
  //     if (!isValid) return;
  //     try {
  //       const storageRef = ref(storage, `images/${blob?.name ?? "file"}`);
  //       const uploadRef = await uploadBytes(storageRef, blob).then(
  //         (snapshot) => snapshot.ref
  //       );
  //       const url = await getDownloadURL(uploadRef).then(
  //         (downloadUrl) => downloadUrl
  //       );
  //       callback(url, blob?.name);
  //     } catch (error) {
  //       if (error instanceof Error)
  //         api.error({
  //           message: error.message,
  //         });
  //     }
  //   }
  // };

  const onClickWrite = handleSubmit((inputs: IBoardWriteInputTypes) => {
    const user = auth.currentUser;
    if (user === null || user === undefined) return;

    const currentCategory = JSON.stringify(inputs.category);
    const emptyCategory = JSON.stringify([]);
    const notEmptyCategory = currentCategory !== emptyCategory;

    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (inputs.title !== undefined && notEmptyCategory && markdown !== "") {
      addDoc(collection(db, "Board"), {
        writer: user.uid,
        title: inputs.title,
        category: inputs.category,
        contents: markdown,
        images: [...fileUrls],
        createdAt: serverTimestamp(),
      })
        .then((result) => {
          void router.push(`/free/${String(result.id)}`);
        })
        .catch((error) => {
          if (error instanceof Error) api.error({ message: error.message });
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

    console.log(inputs.category);
    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (inputs.title === "" && notEmptyCategory && markdown === "") {
      alert("수정한 내용이 없습니다.");
      return;
    }

    const updateBoardInput: IBoardUpdateInputs = {};
    if (inputs.title !== undefined) updateBoardInput.title = inputs.title;
    if (inputs.category !== undefined && notEmptyCategory)
      updateBoardInput.category = inputs.category;
    if (markdown !== "") updateBoardInput.contents = markdown;
    if (isChangedFiles) updateBoardInput.images = fileUrls;
    if (typeof router.query.boardId !== "string") {
      api.error({ message: "시스템에 문제가 있습니다." });
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
        if (error instanceof Error) api.error({ message: error.message });
      });
  });
  // const onClickWrite = async (): Promise<void> => {
  //   if (
  //     inputs.writer !== "" &&
  //     inputs.password !== "" &&
  //     inputs.title !== "" &&
  //     inputs.contents !== ""
  //   ) {
  //     try {
  //       const result = await addDoc(collection(db, "Board"), {
  //         ...inputs,
  //         images: [...fileUrls],
  //         createdAt: serverTimestamp(),
  //       });
  //       void router.push(`/free/${String(result.id)}`);
  //     } catch (error) {
  //       // TODO: 에러 메시지를 alert -> 모달창으로 바꾸기
  //       if (error instanceof Error) api.error({ message: error.message });
  //     }
  //   }
  // };

  // const onClickUpdate = async (): Promise<void> => {
  //   const currentFiles = JSON.stringify(fileUrls);
  //   const defaultFiles = JSON.stringify(data?.images);
  //   const isChangedFiles = currentFiles !== defaultFiles;

  //   if (
  //     inputs.title === "" &&
  //     inputs.contents === "" &&
  //     inputs.youtubeUrl === ""
  //   ) {
  //     alert("수정한 내용이 없습니다.");
  //     return;
  //   }

  //   if (inputs.password === "") {
  //     alert("비밀번호를 입력해주세요.");
  //     return;
  //   }

  //   const updateBoardInput: IUpdateBoardInput = {};
  //   if (inputs.title !== "") updateBoardInput.title = inputs.title;
  //   if (inputs.contents !== "") updateBoardInput.contents = inputs.contents;
  //   if (inputs.youtubeUrl !== "")
  //     updateBoardInput.youtubeUrl = inputs.youtubeUrl;
  //   if (isChangedFiles) updateBoardInput.images = fileUrls;

  //   try {
  //     if (typeof router.query.boardId !== "string") {
  //       alert("시스템에 문제가 있습니다.");
  //       return;
  //     }
  //     const ref = doc(db, "Board", router.query.boardId);
  //     void updateDoc(ref, {
  //       ...updateBoardInput,
  //       updatedAt: serverTimestamp(),
  //     })
  //       .then((docRef) => {
  //         void router.push(`/free/${router.query.boardId as string}`);
  //       })
  //       .catch((error) => {
  //         if (error instanceof Error) alert(error.message);
  //       });

  //   } catch (error) {
  //     // TODO: 에러 메시지를 alert -> 모달창으로 바꾸기
  //     if (error instanceof Error) alert(error.message);
  //   }
  // };

  return {
    // editorRef,
    control,
    errors,
    fileUrls,
    onChangeFileUrls,
    onClickWrite,
    onClickUpdate,
  };
};

// export const useMutationEditor = () => {
//   const editorRef = useRef<Editor>(null);

//   const onChangeContents = (): void => {
//     const contents = editorRef.current?.getInstance().getMarkdown();
//     // console.log("contents changed");
//     if (typeof contents === "undefined") return;
//     setInputs((prev) => ({
//       ...prev,
//       contents,
//     }));
//   };

//   const onUploadImage = async (
//     blob: Blob | File,
//     callback: (url: string, text?: string) => void
//   ): Promise<void> => {
//     console.log(blob);
//     if (blob instanceof File) {
//       const isValid = checkImageValidation(api, blob);
//       if (!isValid) return;
//       try {
//         const storageRef = ref(storage, `images/${blob?.name ?? "file"}`);
//         const uploadRef = await uploadBytes(storageRef, blob).then(
//           (snapshot) => snapshot.ref
//         );
//         const url = await getDownloadURL(uploadRef).then(
//           (downloadUrl) => downloadUrl
//         );
//         callback(url, blob?.name);
//       } catch (error) {
//         if (error instanceof Error)
//           api.error({
//             message: error.message,
//           });
//       }
//     }
//   };
//   return {
//     editorRef
//     onChangeContents
//     onUploadImage
//   }
// }
