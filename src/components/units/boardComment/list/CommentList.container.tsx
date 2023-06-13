import { Divider } from "antd";
import { useQueryIdCheck } from "../../../../commons/hooks/custom/useQueryIdCheck";
import { useQueryFetchComment } from "../../../../commons/hooks/queries/useQueryFetchComment";
import CommentListItem from "./CommentListItem.presenter";

export default function CommentList(): JSX.Element {
  const { id } = useQueryIdCheck("boardId");
  const { data } = useQueryFetchComment({ boardId: id });

  return (
    <>
      <Divider>{data?.length} Comments</Divider>
      {data?.map((el) => (
        <CommentListItem key={el.id} el={el} />
      ))}
    </>
  );
}
