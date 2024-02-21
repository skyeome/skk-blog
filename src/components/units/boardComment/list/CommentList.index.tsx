import React from "react";
import Divider from "@mui/material/Divider";
import type { BoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";
import CommentListItem from "./CommentListItem.presenter";

function CommentList({
  comments,
}: {
  comments?: BoardCommentData[];
}): JSX.Element {
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
