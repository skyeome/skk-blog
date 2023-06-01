import { useMutation } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import type {
  IBoardWriteInputs,
  IBoardWriteProps,
  IBoardWriteErrors,
} from "./BoardWrite.types";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import type {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
} from "../../../../commons/types/generated/types";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";

export default function BoardWrite(props: IBoardWriteProps): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const [inputs, setInputs] = useState<IBoardWriteInputs>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    youtubeUrl: "",
  });
  const [errors, setErrors] = useState<IBoardWriteErrors>({
    id: "",
    message: "",
  });
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  useEffect(() => {
    const images = props.data?.fetchBoard.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.data]);

  const onChangeInputs = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));

    if (event.target.value !== "")
      setErrors({ id: event.target.id, message: "" });
  };

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  const onClickWrite = async (): Promise<void> => {
    if (
      inputs.writer !== "" &&
      inputs.password !== "" &&
      inputs.title !== "" &&
      inputs.contents !== ""
    ) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              ...inputs,
              images: [...fileUrls],
            },
          },
        });
        console.log(result.data?.createBoard._id);
        if (result.data?.createBoard._id === undefined) {
          api.error({ message: "요청에 문제가 있습니다." });
          return;
        }

        void router.push(`/free/${result.data?.createBoard._id}`);
      } catch (error) {
        // TODO: 에러 메시지를 alert -> 모달창으로 바꾸기
        if (error instanceof Error) api.error({ message: error.message });
      }
    }
  };

  const onClickUpdate = async (): Promise<void> => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    if (
      inputs.title === "" &&
      inputs.contents === "" &&
      inputs.youtubeUrl === ""
    ) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    if (inputs.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (inputs.title !== "") updateBoardInput.title = inputs.title;
    if (inputs.contents !== "") updateBoardInput.contents = inputs.contents;
    if (inputs.youtubeUrl !== "")
      updateBoardInput.youtubeUrl = inputs.youtubeUrl;
    if (isChangedFiles) updateBoardInput.images = fileUrls;

    try {
      if (typeof router.query.boardId !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }
      const result = await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password: inputs.password,
          updateBoardInput,
        },
      });

      if (result.data?.updateBoard._id === undefined) {
        alert("요청에 문제가 있습니다.");
        return;
      }

      void router.push(`/free/${result.data?.updateBoard._id}`);
    } catch (error) {
      // TODO: 에러 메시지를 alert -> 모달창으로 바꾸기
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <BoardWriteUI
      isEdit={props.isEdit}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      onChangeInputs={onChangeInputs}
      onChangeFileUrls={onChangeFileUrls}
      errors={errors}
      data={props.data}
      fileUrls={fileUrls}
      api={api}
      contextHolder={contextHolder}
    />
  );
}
