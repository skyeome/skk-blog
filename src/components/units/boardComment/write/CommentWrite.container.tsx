import { useState } from "react";
import type { ChangeEvent } from "react";
import CommentWriteUI from "./CommentWrite.presenter";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT } from "./CommentWrite.queries";
import type {
  IMutation,
  IMutationCreateBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "../list/CommentList.queries";

export default function CommentWrite(): JSX.Element {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    contents: "",
    rating: 0,
  });
  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const onChangeInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const setRating = (rating: number): void => {
    setInputs((prev) => ({
      ...prev,
      rating,
    }));
  };
  const onClickSubmit = async (): Promise<void> => {
    if (typeof router.query.boardId !== "string") return;
    try {
      const result = await createBoardComment({
        variables: {
          boardId: router.query.boardId,
          createBoardCommentInput: inputs,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      console.log(result);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
    setInputs({
      writer: "",
      password: "",
      contents: "",
      rating: 0,
    });
  };

  return (
    <CommentWriteUI
      inputs={inputs}
      onChangeInputs={onChangeInputs}
      setRating={setRating}
      onClickSubmit={onClickSubmit}
    />
  );
}
