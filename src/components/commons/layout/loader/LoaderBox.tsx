import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoaderBox() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoaderBox;
