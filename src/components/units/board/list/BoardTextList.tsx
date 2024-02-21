import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ItemNone from "../../../commons/layout/none/ItemNone";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { BoardListUIProps } from "./BoardList.types";
import * as Styled from "./BoardTextList.styles";
import BoardTextListSkeleton from "./BoardTextListSkeleton";

const BoardTextList = React.forwardRef<HTMLDivElement, BoardListUIProps>(
  ({ data, isLoading }, ref) => {
    if (isLoading) return <BoardTextListSkeleton />;
    if (data === undefined) return <ItemNone />;
    return (
      <div>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((el) => (
              <Styled.TextListWrap key={el.id} spacing={1} py={3}>
                <Typography variant="body2">
                  {el.writer +
                    " • " +
                    format(el.createdAt.toDate(), "yyyy. MM. dd", {
                      locale: ko,
                    })}
                </Typography>
                <Link href={el.id}>
                  <a>
                    <Typography variant="h3" mb={1}>
                      {el.title}
                    </Typography>
                    <Styled.EllipsisText variant="body2" color="GrayText">
                      {el.summary}
                    </Styled.EllipsisText>
                  </a>
                </Link>
              </Styled.TextListWrap>
            ))}
          </React.Fragment>
        ))}
        <Box ref={ref} sx={{ height: 100 }} />
      </div>
    );
  }
);

export default BoardTextList;
