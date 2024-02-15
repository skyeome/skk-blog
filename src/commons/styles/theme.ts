import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Noto Sans KR"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: 20,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 20,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
});

theme.typography.h3 = {
  fontSize: "0.938rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
  },
};

theme.typography.body2 = {
  fontSize: "0.75rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "0.875rem",
  },
};

export default theme;
