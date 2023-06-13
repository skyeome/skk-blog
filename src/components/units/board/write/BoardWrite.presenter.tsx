// import { useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Button } from "antd";
import type { IBoardWriteUIProps } from "./BoardWrite.types";
import FileUpload from "../../../commons/upload/FileUpload.container";
import { v4 as uuidv4 } from "uuid";
import "@toast-ui/editor/dist/toastui-editor.css";
// import { Editor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";

const Editor = dynamic(
  async () => await import("../../../commons/editor/TuiEditor"),
  {
    ssr: false,
  }
);

export default function BoardWriteUI(props: IBoardWriteUIProps): JSX.Element {
  return (
    <>
      {props.contextHolder}
      <Form>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="작성자">
              <Input
                id="writer"
                name="writer"
                placeholder="이름을 적어주세요."
                prefix={<UserOutlined rev={undefined} />}
                onChange={props.onChangeInputs}
                defaultValue={props.data?.writer ?? ""}
                readOnly={Boolean(props.data?.writer)}
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
            defaultValue={props.data?.title}
            onChange={props.onChangeInputs}
          />
        </Form.Item>
        {/* <Form.Item label="내용">
          <Input.TextArea
            id="contents"
            rows={4}
            placeholder="내용을 작성해주세요."
            defaultValue={props.data?.contents}
            onChange={props.onChangeInputs}
          />
        </Form.Item> */}
        <Editor
          initialValue={props.data?.contents}
          editorRef={props.editorRef}
          onChangeContents={props.onChangeContents}
          onUploadImage={props.onUploadImage}
        />
        {props.fileUrls.map((el, index) => (
          <FileUpload
            key={uuidv4()}
            api={props.api}
            fileUrl={el}
            onChangeFileUrls={props.onChangeFileUrls}
            index={index}
          />
        ))}
        <Button
          onClick={props.isEdit ? props.onClickUpdate : props.onClickWrite}
          type="primary"
          size="large"
        >
          {props.isEdit ? "수정완료" : "작성완료"}
        </Button>
      </Form>
    </>
  );
}
