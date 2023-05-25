import { Button, Col, Input, Rate, Row, Space } from "antd";
import type { ICommentWriteProps } from "./CommentWrite.types";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function CommentWriteUI(props: ICommentWriteProps): JSX.Element {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            id="writer"
            placeholder="이름을 적어주세요."
            prefix={<UserOutlined rev={undefined} />}
            onChange={props.onChangeInputs}
          />
        </Col>
        <Col span={8}>
          <Input.Password
            id="password"
            placeholder="비밀번호를 작성해주세요."
            prefix={<LockOutlined rev={undefined} />}
            onChange={props.onChangeInputs}
          />
        </Col>
        <Col span={8}>
          <Rate onChange={props.setRating} />
        </Col>
      </Row>
      <Space></Space>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input.TextArea
            id="contents"
            rows={4}
            placeholder="내용을 작성해주세요."
            defaultValue={props.inputs.contents}
            onChange={props.onChangeInputs}
          />
        </Col>
      </Row>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          props.onClickSubmit().catch((err) => {
            alert(err.message);
          });
        }}
      >
        댓글 남기기
      </Button>
    </>
  );
}
