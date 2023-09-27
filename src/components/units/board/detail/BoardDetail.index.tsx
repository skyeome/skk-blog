import { useQueryFetchBoard } from "../../../../commons/hooks/queries/useQueryFetchBoard";
import Head from "next/head";
import * as S from "./BoardDetail.styles";
import { Button, Col, Row, Skeleton, Modal, message } from "antd";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getDate } from "../../../../commons/libraries/utils";
import TuiViewer from "../../../commons/editor/TuiViewer";
import { userState } from "../../../../commons/stores";
import { useRecoilState } from "recoil";
import { useBoardLike } from "../../../../commons/hooks/custom/useBoardLike";
import _ from "lodash";

export default function BoardDetail(): JSX.Element {
  const [msgApi, msgCtx] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const { data, isLoaded, onClickEditBtn, onClickDeleteBtn } = useQueryFetchBoard(modal);
  const [user] = useRecoilState(userState);
  const { likeCount, liked, onClickLikeBtn } = useBoardLike(msgApi);
  if(!isLoaded && data === undefined) return (<Skeleton active />)
  else return (
    <>
      <div>{msgCtx}</div>
      <div>{contextHolder}</div>
      <Head>
        <title>{data?.title} | 자유게시판</title>
      </Head>
      <S.topKv bg={data?.images?.[0]}>
        <S.topKvBox>
          <S.topKvCategory>자유게시판</S.topKvCategory>
          <S.topKvTitle>{data?.title}</S.topKvTitle>
          <S.topKvInfos>
            <p>
              <UserOutlined rev={undefined} /> {data?.writer}
            </p>
            <p>
              <ClockCircleOutlined rev={undefined} />{" "}
              {getDate(data?.createdAt?.toDate().toDateString() ?? "")}
            </p>
          </S.topKvInfos>
        </S.topKvBox>
      </S.topKv>
      <TuiViewer contents={data?.contents ?? ""} />
      <S.BoardLikeWrap>
        <S.BoardLikeCount>{likeCount}</S.BoardLikeCount>
        <S.BoardLikeBtn onClick={_.debounce(onClickLikeBtn, 300)}>
          {liked ? (
            <HeartFilled rev={undefined} />
          ) : (
            <HeartOutlined rev={undefined} />
          )}{" "}
          좋아요!
        </S.BoardLikeBtn>
      </S.BoardLikeWrap>
      {user?.uid === data?.uid ? (
        <Row justify="end" style={{ margin: "50px 0 100px" }}>
          <Col>
            <Button
              type="primary"
              icon={<EditOutlined rev={undefined} />}
              size="large"
              onClick={onClickEditBtn}
            >
              수정
            </Button>
            <Button
              danger
              icon={<DeleteOutlined rev={undefined} />}
              size="large"
              style={{ marginLeft: "10px" }}
              onClick={onClickDeleteBtn}
            >
              삭제
            </Button>
          </Col>
        </Row>
      ) : (
        <div style={{ margin: "50px 0 100px" }}></div>
      )}
    </>
  );
}
