import { useForm, Controller } from "react-hook-form";
import { Button, Col, Input, Rate, Row, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useQueryIdCheck } from "../../../../commons/hooks/custom/useQueryIdCheck";
import type { ICommentValues } from "../../../../commons/hooks/custom/useBoardComment";
import { useBoardComment } from "../../../../commons/hooks/custom/useBoardComment";
import type { IBoardCommentData } from "../../../../commons/hooks/queries/useQueryFetchComment";

interface ICommentWriteProps {
  isEdit: boolean;
  data?: Omit<IBoardCommentData, "password">;
  onClickSubmit?: () => void;
}

export default function CommentWrite(props: ICommentWriteProps): JSX.Element {
  const { id } = useQueryIdCheck("boardId");
  const { handleSubmit, setValue, reset, control, formState } =
    useForm<ICommentValues>({
      defaultValues: {
        writer: props.data?.writer ?? "",
        contents: props.data?.contents ?? "",
        star: props.data?.star ?? 0,
      },
    });
  const { onClickWrite, onClickUpdate, setRating } = useBoardComment({
    boardId: id,
    commentId: props.data?.id,
    formState,
    setValue,
    reset,
    onClickSubmit: props.onClickSubmit,
  });
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Controller
            name="writer"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                value={value}
                placeholder="이름을 적어주세요."
                prefix={<UserOutlined rev={undefined} />}
                disabled={props.isEdit}
              />
            )}
          />
        </Col>
        <Col span={8}>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input.Password
                onChange={onChange}
                value={value}
                placeholder="비밀번호를 작성해주세요."
                prefix={<LockOutlined rev={undefined} />}
              />
            )}
          />
        </Col>
        <Col span={8}>
          <Rate onChange={setRating} defaultValue={props.data?.star ?? 0} />
        </Col>
      </Row>
      <Space></Space>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Controller
            name="contents"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input.TextArea
                rows={4}
                onChange={onChange}
                value={value}
                placeholder="내용을 작성해주세요."
              />
            )}
          />
        </Col>
      </Row>
      <Button
        type="primary"
        size="large"
        onClick={
          props.isEdit
            ? handleSubmit(onClickUpdate)
            : handleSubmit(onClickWrite)
        }
      >
        {props.isEdit ? "댓글 수정하기" : "댓글 남기기"}
      </Button>
    </>
  );
}
