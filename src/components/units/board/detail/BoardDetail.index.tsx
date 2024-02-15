import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useMutateBoard } from "../../../../commons/hooks/queries/useQueryFetchBoard";
import { Button, Col, Row, Modal, message } from "antd";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Viewer } from "@toast-ui/react-editor";
import { getDate } from "../../../../commons/libraries/utils";
import { userState } from "../../../../commons/stores";
import { useBoardLike } from "../../../../commons/hooks/custom/useBoardLike";
import type { BoardDetailProps } from "./BoardDetail.types";
import * as S from "./BoardDetail.styles";
import "@toast-ui/editor/dist/toastui-editor.css";

export default function BoardDetail({ data }: BoardDetailProps): JSX.Element {
  const router = useRouter();
  const [msgApi, msgCtx] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const { onClickEditBtn, onClickDeleteBtn } = useMutateBoard(modal, router);
  const [user] = useRecoilState(userState);
  const { likeCount, liked, onClickLikeBtn } = useBoardLike(msgApi);
  return (
    <>
      <div>{msgCtx}</div>
      <div>{contextHolder}</div>
      <Head>
        <title>{data.title} | 자유게시판</title>
      </Head>
      <S.topKv bg={data.images?.[0]}>
        <S.topKvBox>
          <S.topKvCategory>자유게시판</S.topKvCategory>
          <S.topKvTitle>{data.title}</S.topKvTitle>
          <S.topKvInfos>
            <p>
              <UserOutlined rev={undefined} /> {data.writer}
            </p>
            <p>
              <ClockCircleOutlined rev={undefined} />{" "}
              {getDate(data.createdAt?.toDate().toDateString() ?? "")}
            </p>
          </S.topKvInfos>
        </S.topKvBox>
      </S.topKv>
      <Viewer initialValue={data.contents} />
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
      {user?.uid === data.uid ? (
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
