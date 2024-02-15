import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Container, Grid } from "@mui/material";
import { AuthUser } from "./LayoutAuthUser.index";
import * as S from "./LayoutHeader.styles";
import IconButton from "@mui/material/IconButton";

interface IHeaderProps {
  handleOpen: VoidFunction;
}

function LayoutHeader({ handleOpen }: IHeaderProps): JSX.Element {
  return (
    <Container maxWidth="md">
      <Grid
        container
        columnSpacing={{ xs: 3, sm: 3, md: 3 }}
        alignItems="center"
        py={1}
      >
        <Grid item xs={4.5} sm={5}>
          <IconButton color="inherit" onClick={handleOpen}>
            <MenuOpenIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3} sm={2}>
          <S.Logo>
            <Link href="/">
              <a>
                <Image
                  src="https://s3.ap-northeast-2.amazonaws.com/skkblog.com/seri.diary-logo.webp"
                  // objectFit="cover"
                  layout="fill"
                />
              </a>
            </Link>
          </S.Logo>
        </Grid>
        <Grid item xs={4.5} sm={5}>
          <AuthUser />
        </Grid>
      </Grid>
    </Container>
  );
}
export default memo(LayoutHeader);
