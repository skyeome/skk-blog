import { useRouter } from "next/router";
import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.container";
import { useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../src/commons/types/generated/types";
import { FETCH_BOARD } from "../../../../src/components/units/board/detail/BoardDetail.queries";

export default function BoardUpdatePage(): JSX.Element {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: router.query.boardId },
    }
  );

  return <BoardWrite isEdit={true} data={data} />;
}
