import { useQueryFetchBoard } from "../../../../commons/hooks/queries/useQueryFetchBoard";
import Head from "next/head";
import * as S from "./BoardDetail.styles";
import { Button, Col, Row, Skeleton, Modal } from "antd";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getDate } from "../../../../commons/libraries/utils";
import TuiViewer from "../../../commons/editor/TuiViewer";
import { userState } from "../../../../commons/stores";
import { useRecoilState } from "recoil";

export default function BoardDetail(): JSX.Element {
  const [modal, contextHolder] = Modal.useModal();
  const { data, onClickEditBtn, onClickDeleteBtn } = useQueryFetchBoard(modal);
  const [user] = useRecoilState(userState);
  return (
    <>
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
      {data !== undefined ? (
        <>
          <TuiViewer contents={data?.contents ?? ""} />
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
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
