import { Box, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export const AvatarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: "2rem 0",
}));

export const HiddenInput = styled("input")({
  appearance: "none",
  width: 0,
  height: 0,
  visibility: "hidden",
});

export const ProfileDelBtn = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,

  background: theme.palette.background.paper,
  boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",

  "&:hover": {
    background: theme.palette.background.paper,
  },
}));
