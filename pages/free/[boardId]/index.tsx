import { useEffect } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.index";
import CommentWrite from "../../../src/components/units/boardComment/write/CommentWrite.index";
import CommentList from "../../../src/components/units/boardComment/list/CommentList.index";
import { useQueryFetchComment } from "../../../src/commons/hooks/queries/useQueryFetchComment";
import { getBoardDetail } from "../../../src/commons/apis/board";

export default function BoardDetailPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const router = useRouter();
  const { data: boardDetail, isFetched } = useQuery({
    queryKey: ["board", id],
    queryFn: async () => await getBoardDetail(id),
  });
  const { data, refetch } = useQueryFetchComment(id);

  // 게시글을 찾지 못하였을때 다른 페이지로 이동
  useEffect(() => {
    if (isFetched && boardDetail === undefined)
      void router.replace("/free/not-found");
  }, [boardDetail, isFetched]);

  return (
    <>
      {boardDetail !== undefined && <BoardDetail data={boardDetail} />}
      <CommentWrite refetch={refetch} />
      <CommentList comments={data} />
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
