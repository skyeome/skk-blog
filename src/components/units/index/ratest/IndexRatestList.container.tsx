import { useQuery } from "@apollo/client";
import IndexRatestListUI from "./IndexRatestList.presenter";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_BOARDS } from "./IndexRatestList.queries";

export default function IndexRatestList(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  return <IndexRatestListUI data={data} />;
}
