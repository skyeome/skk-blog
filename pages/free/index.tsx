import Fab from "@mui/material/Fab";
import Head from "next/head";
import Link from "next/link";
import BoardList from "../../src/components/units/board/list/BoardList.container";
import EditIcon from "@mui/icons-material/Edit";

export default function FreeBoardPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>자유게시판</title>
      </Head>
      <BoardList />
      <Link href="/free/new">
        <Fab
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: 20, right: 20 }}
        >
          <EditIcon sx={{ mr: 1 }} />
          글쓰기
        </Fab>
      </Link>
    </>
  );
}
