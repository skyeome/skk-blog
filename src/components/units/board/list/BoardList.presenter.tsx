import type { IBoardListProps } from "./BoardList.types";
import InfiniteScroller from "react-infinite-scroller";
import BoardListItem from "./BoardListItem.presenter";
import { Affix, Button, Skeleton } from "antd";
import { BoardListItemWrap } from "./BoardList.styles";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function BoardListUI(props: IBoardListProps): JSX.Element {
  return (
    <>
      <BoardListItemWrap>
        {props.data !== undefined ? (
          <InfiniteScroller
            loadMore={() => {
              props.onLoadMore(props.lastKey ?? "");
            }}
            hasMore={props.lastKey.toString() !== ""}
            loader={<Skeleton />}
          >
            {props.data?.map((el) => (
              <BoardListItem key={el.id} el={el} colCounts={2} />
            ))}
          </InfiniteScroller>
        ) : (
          <Skeleton />
        )}
      </BoardListItemWrap>
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
