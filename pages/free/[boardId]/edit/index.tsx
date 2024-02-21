import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useQuery } from "react-query";
import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.index";
import { userIdCheck } from "../../../../src/components/commons/hocs/loginCheck";
import { getBoardDetail } from "../../../../src/commons/apis/board";
import LoaderBox from "../../../../src/components/commons/layout/loader/LoaderBox";

function BoardUpdatePage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { data } = useQuery({
    queryKey: ["board", id],
    queryFn: async () => await getBoardDetail(id),
  });
  if (data === undefined) return <LoaderBox />;
  return (
    <>
      <Head>
        <title>(수정중) {data.title} | 나만의 블로그</title>
      </Head>
      <BoardWrite isEdit data={data} />
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

export default userIdCheck(BoardUpdatePage);
