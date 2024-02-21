import { useEffect } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQueries } from "react-query";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.index";
import CommentWrite from "../../../src/components/units/boardComment/write/CommentWrite.index";
import CommentList from "../../../src/components/units/boardComment/list/CommentList.index";
import {
  getBoardDetail,
  getCommentData,
} from "../../../src/commons/apis/board";

export default function BoardDetailPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const router = useRouter();
  const result = useQueries([
    {
      queryKey: ["board", id],
      queryFn: async () => await getBoardDetail(id),
    },
    {
      queryKey: ["board", id, "comments"],
      queryFn: async () => await getCommentData(id),
    },
  ]);

  // 게시글을 찾지 못하였을때 다른 페이지로 이동
  useEffect(() => {
    if (result[0].isFetched && result[0].data === undefined)
      void router.replace("/free/not-found");
  }, [result[0].data, result[0].isFetched]);

  return (
    <>
      {result[0].data !== undefined && <BoardDetail data={result[0].data} />}
      <CommentWrite refetch={result[1].refetch} />
      <CommentList comments={result[1].data} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ id: string }> = async (
  context
) => {
  // context에서 query 추출
  const { query } = context;
  // query에서 boardId를 추출
  const { boardId } = query;
  let id = "";

  if (boardId === undefined) id = "";
  if (typeof boardId === "string") id = boardId;
  if (typeof boardId === "object") id = boardId[0];

  return {
    props: {
      id,
    },
  };
};
