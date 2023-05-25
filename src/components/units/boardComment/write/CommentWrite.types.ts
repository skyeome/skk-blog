import type { ChangeEvent } from "react";

export interface ICommentWriteProps {
  inputs: {
    writer: string;
    password: string;
    contents: string;
    rating: number;
  };
  onChangeInputs: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setRating: (rating: number) => void;
  onClickSubmit: () => Promise<void>;
}
