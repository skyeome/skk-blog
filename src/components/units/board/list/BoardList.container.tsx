import { useEffect } from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { getBoardsAll } from "../../../../commons/apis/board";
import BoardListUI from "./BoardList.presenter";

export default function BoardList(): JSX.Element {
  const router = useRouter();
  // parameter 가져오기
  const { tag: tagName } = router.query;
  let tag = "";
  if (tagName === undefined) tag = "";
  if (typeof tagName === "string") tag = tagName;
  if (typeof tagName === "object") tag = tagName[0];

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
