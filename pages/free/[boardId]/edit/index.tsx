import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { userIdCheck } from "../../../../src/components/commons/hocs/loginCheck";
import { getBoardDetail } from "../../../../src/commons/apis/board";

const BoardWrite = dynamic(
  async () =>
    await import(
      "../../../../src/components/units/board/write/BoardWrite.index"
    ),
  { ssr: false }
);

function BoardUpdatePage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { data } = useQuery({
    queryKey: ["board", id],
    queryFn: async () => await getBoardDetail(id),
  });
  if (data === undefined)
    return (
      <Box
        sx={{
          height: "calc(100vh - 100px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  return <BoardWrite isEdit={true} data={data} />;
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
