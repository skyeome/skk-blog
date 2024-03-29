import React from "react";
import BoardListItem from "./BoardListItem.presenter";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ItemNone from "../../../commons/layout/none/ItemNone";
import BoardListSkeleton from "./BoardListSkeleton";
import type { BoardListUIProps } from "./BoardList.types";

const BoardListUI = React.forwardRef<HTMLDivElement, BoardListUIProps>(
  ({ data, isLoading }, ref) => {
    if (isLoading) return <BoardListSkeleton />;
    if (data === undefined) return <ItemNone />;
    return (
      <div>
        <Box sx={{ minHeight: "100vh" }}>
          <Grid container spacing={2}>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.map((el) => (
                  <Grid item key={el.id} xs={12} sm={6}>
                    <BoardListItem el={el} />
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </Box>
        <Box ref={ref} sx={{ height: 100 }} />
      </div>
    );
  }
);

export default BoardListUI;
