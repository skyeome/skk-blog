import { styled } from "@mui/material";

export const RatestListItem = styled("div")<{ counts?: number }>`
  display: flex;
  gap: 1rem;

  width: ${(props) => (props.counts === undefined ? 100 : 100 / props.counts)}%;
  margin-bottom: 1.5rem;
`;
export const RatestItemThumb = styled("a")(({ theme }) => ({
  position: "relative",

  display: "block",
  maxWidth: 140,
  margin: "0 auto",
  aspectRatio: 1,

  overflow: "hidden",
  cursor: "pointer",
  [theme.breakpoints.up("sm")]: {
    aspectRatio: 1.34,
  },
}));
export const RatestItemDesc = styled("div")`
  flex: 1;
`;
