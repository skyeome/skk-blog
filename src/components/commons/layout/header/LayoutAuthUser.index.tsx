import { useState } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import useAuthChange from "../../../../commons/hooks/custom/useAuthChange";
import { HeaderUsers } from "./LayoutHeader.styles";
import { useQuery } from "react-query";
import { getMyInfo } from "../../../../commons/apis/mypage";
import { paperProps } from "./LayoutAuthUser.styles";

export function AuthUser(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { user, handleLogout } = useAuthChange();
  const { data } = useQuery({
    queryKey: ["mypage", "userInfo"],
    queryFn: async () => await getMyInfo(user?.uid),
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user !== null ? (
        <HeaderUsers>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                alt={data?.nickname}
                src={user?.photoURL !== null ? user?.photoURL : undefined}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={paperProps}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              <Link href="/mypage/edit">내 정보 관리</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              로그아웃
            </MenuItem>
          </Menu>
        </HeaderUsers>
      ) : (
        <HeaderUsers>
          <Link href="/auth/signin">로그인</Link>
        </HeaderUsers>
      )}
    </>
  );
}
