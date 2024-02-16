import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

function IndexRatestSkeleton() {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      mb={3}
    >
      <Grid item xs={4} sm={3}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={isLarge ? 104 : 120}
        />
      </Grid>
      <Grid item xs={8} sm={9}>
        <Skeleton animation="wave" width={150} />
        <Skeleton animation="wave" width={200} height={36} />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width={220} />
      </Grid>
    </Grid>
  );
}

export default IndexRatestSkeleton;
