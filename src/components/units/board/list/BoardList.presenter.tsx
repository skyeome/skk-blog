import type { IBoardListProps } from "./BoardList.types";
import InfiniteScroller from "react-infinite-scroller";
import BoardListItem from "./BoardListItem.presenter";
import { Affix, Button, Skeleton } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import Grid from "@mui/material/Grid";

export default function BoardListUI(props: IBoardListProps): JSX.Element {
  return (
    <>
      {props.data !== undefined ? (
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
      ) : (
        <Skeleton />
      )}

      <Affix offsetBottom={10}>
        <Link href="/free/new">
          <Button
            type="primary"
            icon={<EditOutlined rev={undefined} />}
            size="large"
          >
            글쓰기
          </Button>
        </Link>
      </Affix>
    </>
  );
}
