import React from "react";
import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { BoardListItemImg } from "./BoardList.styles";

function BoardListSkeleton() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((el) => (
        <Grid item key={el} xs={12} sm={6}>
          <Card>
            <CardActionArea type="button">
              <BoardListItemImg>
                <Skeleton variant="rectangular" animation="wave" width="100%">
                  <div style={{ paddingTop: "68.26%" }} />
                </Skeleton>
              </BoardListItemImg>
              <CardContent>
                <Typography variant="h3" mb={1}>
                  <Skeleton animation="wave" height={30} />
                </Typography>
                <Typography variant="body2">
                  <Skeleton animation="wave" height={20} />
                  <Skeleton animation="wave" width={180} height={20} />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Typography variant="body2" color="GrayText" p={1}>
                <Skeleton animation="wave" width={130} />
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BoardListSkeleton;
