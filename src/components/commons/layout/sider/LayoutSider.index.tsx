import type { ReactNode } from "react";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import FixedSiderNav from "./LayoutSider.styles";
import { Divider } from "@mui/material";
import useAuthChange from "../../../../commons/hooks/custom/useAuthChange";

interface ISiderProps {
  open: boolean;
  handleClose: VoidFunction;
}

interface MenuItem {
  href: string;
  text: string;
  icon?: ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  {
    href: "/free",
    text: "전체 글 보기",
    icon: <ChatIcon />,
  },
  {
    href: "/free/?tag=Javascript",
    text: "#Javascript",
  },
  {
    href: "/free/?tag=Typescript",
    text: "#Typescript",
  },
  {
    href: "/free/?tag=React",
    text: "#React",
  },
  {
    href: "/free/?tag=Next.js",
    text: "#Next.js",
  },
  {
    href: "/free/?tag=Git",
    text: "#Git",
  },
];

const LayoutSider = ({ open, handleClose }: ISiderProps) => {
  const { user, handleLogout } = useAuthChange();

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <FixedSiderNav aria-label="board folders">
        <List>
          {MENU_ITEMS.map((menu) => (
            <ListItem key={menu.href}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <Link href={menu.href}>{menu.text}</Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {/* 로그인 관련 메뉴 */}
          {user?.uid !== undefined ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <Link href="/mypage">내 정보 보기</Link>
              </ListItem>
              <ListItem
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                로그아웃
              </ListItem>
            </>
          ) : (
            <ListItem>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <Link href="/auth/signin">로그인</Link>
            </ListItem>
          )}
        </List>
      </FixedSiderNav>
    </Drawer>
  );
};

export default LayoutSider;
