import { useQuery } from "@apollo/client";
import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD } from "./BoardDetail.queries";
import type {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";

export default function BoardDetail(): JSX.Element {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: router.query.boardId } }
  );
  return <BoardDetailUI data={data} />;
}
