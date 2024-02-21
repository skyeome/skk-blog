import React from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import * as Styled from "./BoardTextList.styles";

const BoardTextListSkeleton = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((el) => (
        <Styled.TextListWrap key={el} spacing={1} py={3}>
          <Typography variant="body2">
            <Skeleton variant="text" width={150} />
          </Typography>
          <Typography variant="h3" mb={1}>
            <Skeleton variant="text" width={210} />
          </Typography>
          <Styled.EllipsisText variant="body2" color="GrayText">
            <Skeleton variant="text" />
          </Styled.EllipsisText>
        </Styled.TextListWrap>
      ))}
    </div>
  );
};
export default BoardTextListSkeleton;
