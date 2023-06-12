import type { IBoardListProps } from "./BoardList.types";
// import InfiniteScroller from "react-infinite-scroller";
import BoardListItem from "./BoardListItem.presenter";
import { Affix, Button } from "antd";
import { BoardListItemWrap } from "./BoardList.styles";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function BoardListUI(props: IBoardListProps): JSX.Element {
  return (
    <>
      <BoardListItemWrap>
        {/* {props.data !== undefined ? (
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
        )} */}
        {props.data?.map((el) => (
          <BoardListItem
            key={el.id}
            boardId={el.id}
            el={el.data({ serverTimestamps: "estimate" })}
            colCounts={2}
          />
        ))}
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
