import CommentWrite from "../../../src/components/units/boardComment/write/CommentWrite.index";
import CommentList from "../../../src/components/units/boardComment/list/CommentList.index";
import dynamic from "next/dynamic";
import { useQueryFetchComment } from "../../../src/commons/hooks/queries/useQueryFetchComment";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const BoardDetail = dynamic(
  async () =>
    await import(
      "../../../src/components/units/board/detail/BoardDetail.index"
    ),
  { ssr: false }
);
export default function BoardDetailPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { data, refetch } = useQueryFetchComment(id);

  return (
    <>
      <BoardDetail />
      <CommentWrite isEdit={false} refetch={refetch} />
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
