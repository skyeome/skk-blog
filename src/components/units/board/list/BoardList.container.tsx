import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getBoardsAll } from "../../../../commons/apis/board";
import BoardListUI from "./BoardList.presenter";
import type { BoardListProps } from "./BoardList.types";

export default function BoardList({ tag }: BoardListProps): JSX.Element {
  const [ref, inView] = useInView();
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["board", tag === "" ? "all" : tag],
    queryFn: async ({ pageParam }) => await getBoardsAll({ pageParam, tag }),
    getNextPageParam: (lastPage) =>
      lastPage.length < 6 ? null : lastPage[lastPage.length - 1].createdAt,
    retry: 1,
  });

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView]);

  return <BoardListUI data={data} isLoading={isLoading} ref={ref} />;
}
