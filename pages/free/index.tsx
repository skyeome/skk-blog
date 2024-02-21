import Fab from "@mui/material/Fab";
import Head from "next/head";
import Link from "next/link";
import useSearchParam from "../../src/commons/hooks/custom/useSearchParam";
import BoardList from "../../src/components/units/board/list/BoardList.container";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";

export default function FreeBoardPage(): JSX.Element {
  const tag = useSearchParam("tag");

  return (
    <>
      <Head>
        <title>자유게시판</title>
      </Head>
      <Typography variant="h2" py={6}>
        {tag === "" ? "✍️전체 글 보기" : "#" + tag}
      </Typography>
      <BoardList tag={tag} />
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
