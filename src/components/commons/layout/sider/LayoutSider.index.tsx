import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChatIcon from "@mui/icons-material/Chat";
import { useRouter } from "next/router";

interface ISiderProps {
  open: boolean;
  handleClose: VoidFunction;
}

const LayoutSider = ({ open, handleClose }: ISiderProps) => {
  const router = useRouter();
  const navigate = (to: string) => {
    void router.push(to);
    handleClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <nav aria-label="board folders">
        <List>
          <ListItem
            onClick={() => {
              navigate("/free");
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="자유게시판" />
          </ListItem>
        </List>
      </nav>
    </Drawer>
  );
};

export default LayoutSider;
