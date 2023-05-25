import { useQuery } from "@apollo/client";
import CommentListUI from "./CommentList.presenter";
import { FETCH_BOARD_COMMENTS } from "./CommentList.queries";
import type {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";

export default function CommentList(): JSX.Element {
  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: router.query.boardId as string },
  });

  return <CommentListUI data={data} onLoadMore={() => {}} />;
}
