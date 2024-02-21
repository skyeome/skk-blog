import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IndexRatestListItem from "./IndexRatestListItem";
import type { IndexRatestListProps } from "./IndexRatestList.types";
import IndexRatestSkeleton from "./IndexRatestSkeleton";
import * as S from "./IndexRatestList.styles";

const IndexRatestListUI = React.forwardRef<
  HTMLDivElement,
  IndexRatestListProps
>(({ title, data, infiniteData, isLoading }, ref) => {
  return (
    <S.Ratest>
      <Typography variant="h3" mb={2}>
        {title !== undefined ? title : "What's New"}
      </Typography>
      {isLoading &&
        [1, 2, 3, 4, 5, 6].map((el) => <IndexRatestSkeleton key={el} />)}
      {/* 정적인 페이지의 경우 해당 */}
      {data?.map((el) => (
        <IndexRatestListItem key={el.id} data={el} />
      ))}
      {/* 무한 스크롤 버전일 경우에만 해당 */}
      {infiniteData?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((el) => (
            <IndexRatestListItem key={el.id} data={el} />
          ))}
        </React.Fragment>
      ))}
      {ref !== null && <Box ref={ref} sx={{ height: 100 }} />}
    </S.Ratest>
  );
});
export default IndexRatestListUI;
