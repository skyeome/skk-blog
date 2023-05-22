import { getDate } from "../../../../commons/libraries/utils";
import type { IBoardDetailProps } from "./BoardDetail.types";
import { Skeleton } from "antd";

export default function BoardDetailUI(props: IBoardDetailProps): JSX.Element {
  return (
    <>
      {props.data !== undefined ? (
        <>
          <h3>{props.data?.fetchBoard.writer}</h3>
          <h2>{props.data?.fetchBoard.title}</h2>
          <p>{getDate(props.data?.fetchBoard.createdAt)}</p>
          <p>{props.data?.fetchBoard.contents}</p>
        </>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
