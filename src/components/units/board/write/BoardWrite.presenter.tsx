import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Button } from "antd";
import type { IBoardWriteUIProps } from "./BoardWrite.types";

export default function BoardWriteUI(props: IBoardWriteUIProps): JSX.Element {
  return (
    <>
      {props.data !== undefined && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="작성자">
                <Input
                  id="writer"
                  placeholder="이름을 적어주세요."
                  prefix={<UserOutlined rev={undefined} />}
                  onChange={props.onChangeInputs}
                  defaultValue={
                    props.data?.fetchBoard.writer === undefined ||
                    props.data?.fetchBoard.writer === null
                      ? ""
                      : props.data?.fetchBoard.writer
                  }
                  readOnly={Boolean(props.data?.fetchBoard.writer)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="비밀번호">
                <Input.Password
                  id="password"
                  placeholder="비밀번호를 작성해주세요."
                  prefix={<LockOutlined rev={undefined} />}
                  onChange={props.onChangeInputs}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="제목">
            <Input
              id="title"
              placeholder="제목을 적어주세요."
              defaultValue={props.data?.fetchBoard.title}
              onChange={props.onChangeInputs}
            />
          </Form.Item>
          <Form.Item label="내용">
            <Input.TextArea
              id="contents"
              rows={4}
              placeholder="내용을 작성해주세요."
              defaultValue={props.data?.fetchBoard.contents}
              onChange={props.onChangeInputs}
            />
          </Form.Item>

          <Button
            onClick={props.isEdit ? props.onClickUpdate : props.onClickWrite}
            type="primary"
            size="large"
          >
            {props.isEdit ? "수정완료" : "작성완료"}
          </Button>
        </>
      )}
    </>
  );
}
