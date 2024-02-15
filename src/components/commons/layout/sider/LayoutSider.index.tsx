import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChatIcon from "@mui/icons-material/Chat";
import FixedSiderNav from "./LayoutSider.styles";
import Link from "next/link";

interface ISiderProps {
  open: boolean;
  handleClose: VoidFunction;
}

const LayoutSider = ({ open, handleClose }: ISiderProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <FixedSiderNav aria-label="board folders">
        <List>
          <ListItem onClick={handleClose}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <Link href="/free">자유게시판</Link>
          </ListItem>
        </List>
      </FixedSiderNav>
    </Drawer>
  );
};

export default LayoutSider;
