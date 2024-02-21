import React from "react";
import Divider from "@mui/material/Divider";
import CommentListItem from "./CommentListItem.presenter";
import type { BoardComment } from "../../../../commons/libraries/firestore";

function CommentList({ comments }: { comments?: BoardComment[] }): JSX.Element {
  return (
    <>
      <Divider sx={{ mb: 2 }}>{comments?.length} Comments</Divider>
      {comments?.map((el) => (
        <CommentListItem key={el.id} el={el} />
      ))}
    </>
  );
}
export default React.memo(CommentList);
