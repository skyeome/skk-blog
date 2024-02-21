import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

export const BoardListItemWrap = styled.div`
  > div {
    display: flex;
    flex-wrap: wrap;
    a {
      display: block;
      width: 100%;
    }
  }
`;
export const BoardListItemImg = styled.div`
  position: relative;
  aspect-ratio: 1024 / 699;
  /* background-color: #000; */
`;
export const BoardListItemTitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const BoardListItemSummary = styled(Typography)`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
