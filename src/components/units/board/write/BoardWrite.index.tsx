import { Form, Input, Button, notification, Select } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { IBoardWriteProps } from "./BoardWrite.types";
// import dynamic from "next/dynamic";
import FileUpload from "../../../commons/upload/FileUpload.container";
import { v4 as uuidv4 } from "uuid";
import { FileUploadWrap } from "./BoardWrite.styles";
import { useMutationCreateBoard } from "../../../../commons/hooks/mutations/useMutationCreateBoard";
import { useRef } from "react";

import { Controller } from "react-hook-form";
import type { Editor } from "@toast-ui/react-editor";
import TuiEditor from "../../../commons/editor/TuiEditor";

const options: object[] = [
  { label: "Javascript", value: "Javascript" },
  { label: "Typescript", value: "Typescript" },
  { label: "React", value: "React" },
  { label: "Next.js", value: "Next.js" },
];

export default function BoardWrite(props: IBoardWriteProps): JSX.Element {
  const [api, contextHolder] = notification.useNotification();

  const editorRef = useRef<Editor>(null);
  const {
    control,
    errors,
    fileUrls,
    // onChangeContents,
    // onUploadImage,
    onChangeFileUrls,
    onClickWrite,
    onClickUpdate,
  } = useMutationCreateBoard(api, editorRef, props?.data);

  return (
    <>
      {contextHolder}
      <Form
        onFinish={props.isEdit ? onClickUpdate : onClickWrite}
        autoComplete="off"
      >
        <Form.Item label="제목">
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                defaultValue={props.data?.title}
                onChange={onChange}
                value={value}
                placeholder="제목을 적어주세요."
              />
            )}
          />
          {/* <Input
            id="title"
            placeholder="제목을 적어주세요."
            defaultValue={props.data?.title}
            onChange={onChangeInputs}
          /> */}
          {errors.title?.message}
        </Form.Item>
        <Form.Item label="언어">
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="언어를 선택해 주세요"
                onChange={onChange}
                value={value}
                defaultValue={props.data?.category}
                options={options}
              />
            )}
          />
          {errors.category?.message}
        </Form.Item>
        <TuiEditor
          api={api}
          initialValue={props.data?.contents}
          editorRef={editorRef}
          // setContents={setContents}
        />
        <FileUploadWrap>
          {fileUrls.map((el, index) => (
            <FileUpload
              key={uuidv4()}
              api={api}
              fileUrl={el}
              onChangeFileUrls={onChangeFileUrls}
              index={index}
            />
          ))}
        </FileUploadWrap>
        <Button type="primary" htmlType="submit" size="large">
          {props.isEdit ? "수정완료" : "작성완료"}
        </Button>
      </Form>
    </>
  );
}
