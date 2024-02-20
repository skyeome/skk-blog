import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/Inbox";
import * as Styled from "./ItemNone.styles";

function ItemNone() {
  return (
    <Styled.ItemNoneWrap py={6}>
      <div>
        <InboxIcon fontSize="large" color="inherit" />
      </div>
      <Typography variant="h3" color="GrayText">
        아직 글이 없습니다.
      </Typography>
    </Styled.ItemNoneWrap>
  );
}

export default ItemNone;
