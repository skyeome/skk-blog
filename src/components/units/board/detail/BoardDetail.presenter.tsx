import * as S from "./BoardDetail.styles";
import { getDate } from "../../../../commons/libraries/utils";
import type { IBoardDetailProps } from "./BoardDetail.types";
import { Button, Skeleton } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

export default function BoardDetailUI(props: IBoardDetailProps): JSX.Element {
  return (
    <>
      <S.topKv>
        <S.topKvBox>
          <S.topKvCategory>자유게시판</S.topKvCategory>
          <S.topKvTitle>{props.data?.title}</S.topKvTitle>
          <S.topKvInfos>
            <p>
              <UserOutlined rev={undefined} /> {props.data?.writer}
            </p>
            <p>
              <ClockCircleOutlined rev={undefined} />{" "}
              {getDate(props.data?.createdAt?.toDate())}
            </p>
          </S.topKvInfos>
        </S.topKvBox>
      </S.topKv>
      {props.data !== undefined ? (
        <>
          <p>{props.data?.contents}</p>
          <div>
            <Button
              type="primary"
              icon={<EditOutlined rev={undefined} />}
              size="large"
              onClick={props.onClickEditBtn}
            >
              수정
            </Button>
          </div>
        </>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
