import { useState, useEffect } from "react";
import {
  useQueryFetchBoards,
  useQueryFetchMoreBoards,
} from "../../../../commons/hooks/queries/useQueryFetchBoards";
import BoardListUI from "./BoardListOld.presenter";
import type { BoardRatest } from "../../index/ratest/IndexRatestList.types";

export default function BoardList(): JSX.Element {
  const [posts, setPosts] = useState<BoardRatest[]>();
  const [lastKey, setLastKey] = useState("");
  useEffect(() => {
    void useQueryFetchBoards()
      .then((res) => {
        setPosts(res.posts);
        setLastKey(res.lastKey);
      })
      .catch((err) => {
        if (err instanceof Error) alert(err.message);
      });
  }, []);

  const onLoadMore = (key: any): void => {
    // console.log(key);
    if (key.length <= 0) return;
    void useQueryFetchMoreBoards(key)
      .then((res) => {
        setLastKey(res.lastKey); // add new posts to old posts
        setPosts((prev) => prev?.concat(res.posts));
      })
      .catch((err) => {
        if (err instanceof Error) alert(err.message);
      });
  };

  return <BoardListUI data={posts} onLoadMore={onLoadMore} lastKey={lastKey} />;
}
