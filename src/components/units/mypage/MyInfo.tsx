import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import useAuthChange from "../../../commons/hooks/custom/useAuthChange";
import type { MyInfoProps } from "./MyInfo.types";

function MyInfo({ data }: MyInfoProps) {
  const { handleLogout } = useAuthChange();

  return (
    <Grid container spacing={2} py={4}>
      <Grid item xs={12} sm={6}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            alt={data?.nickname}
            src={data?.avatar}
            sx={{ width: 64, height: 64 }}
          />
          <div>
            {data === undefined ? (
              <Skeleton />
            ) : (
              <Typography variant="h2" mb={1}>
                {data.nickname}
              </Typography>
            )}

            <Link href="/mypage/edit">
              <a>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ color: "primary.main" }}
                >
                  <EditIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={500}>
                    프로필 수정
                  </Typography>
                </Stack>
              </a>
            </Link>
          </div>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          alignItems="center"
          mt={1.5}
        >
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            color="inherit"
            sx={{ color: "GrayText" }}
          >
            로그아웃
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MyInfo;
