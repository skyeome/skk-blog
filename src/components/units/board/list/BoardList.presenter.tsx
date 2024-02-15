import type { IBoardListProps } from "./BoardList.types";
import InfiniteScroller from "react-infinite-scroller";
import BoardListItem from "./BoardListItem.presenter";
import Grid from "@mui/material/Grid";
import { Skeleton } from "@mui/material";

export default function BoardListUI(props: IBoardListProps): JSX.Element {
  return (
    <>
      {props.data !== undefined && (
        <InfiniteScroller
          loadMore={() => {
            props.onLoadMore(props.lastKey ?? "");
          }}
          hasMore={props.lastKey.toString() !== ""}
          loader={<Skeleton />}
        >
          <Grid container spacing={2}>
            {props.data?.map((el) => (
              <Grid item xs={6}>
                <BoardListItem key={el.id} el={el} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroller>
      )}
    </>
  );
}
