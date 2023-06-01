import type { IBoardListProps } from "./BoardList.types";
import InfiniteScroller from "react-infinite-scroller";
import BoardListItem from "./BoardListItem.presenter";
import { Skeleton } from "antd";
import { BoardListItemWrap } from "./BoardList.styles";

export default function BoardListUI(props: IBoardListProps): JSX.Element {
  return (
    <BoardListItemWrap>
      {props.data !== undefined ? (
        <InfiniteScroller
          loadMore={props.onLoadMore}
          hasMore={true}
          loader={<div>loading...</div>}
        >
          {props.data?.fetchBoards.map((el) => (
            <BoardListItem key={el._id} el={el} colCounts={2} />
          ))}
        </InfiniteScroller>
      ) : (
        <Skeleton />
      )}
    </BoardListItemWrap>
  );
}
