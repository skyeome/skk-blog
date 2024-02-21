import { useState } from "react";
import Head from "next/head";
import useSearchParam from "../../src/commons/hooks/custom/useSearchParam";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import BoardList from "../../src/components/units/board/list/BoardList.container";
import BoardListTop from "../../src/components/units/board/list/BoardListTop";
import type { ViewLayoutType } from "../../src/components/units/board/list/BoardListTop.types";

export default function FreeBoardPage(): JSX.Element {
  const tag = useSearchParam("tag");
  const [viewLayout, setViewLayout] = useState<ViewLayoutType>("card");
  return (
    <>
      <Head>
        <title>{tag === "" ? "전체 글 보기" : "#" + tag} | skk-blog</title>
      </Head>
      <BoardListTop tag={tag} layout={viewLayout} setLayout={setViewLayout} />
      <BoardList tag={tag} layout={viewLayout} />
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
