import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const TextListWrap = styled(Stack)`
  border-bottom: 1px solid #ccc;
`;

export const EllipsisText = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;
