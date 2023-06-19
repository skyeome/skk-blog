import { Button, Form, Input } from "antd";
import * as S from "../signup/Signup.styles";
import { Controller } from "react-hook-form";
import { useMutationResetEmail } from "../../../../commons/hooks/mutations/useMutationResetEmail";
import type { IFindPasswordProps } from "./FindPassword.types";
import Link from "next/link";

export default function FindPassword(props: IFindPasswordProps): JSX.Element {
  const { control, errors, onSubmit } = useMutationResetEmail(props.api);
  return (
    <S.SignWrap>
      {props.contextHolder}
      <S.SignContent>
        <S.SignTitle>
          비밀번호 <span>재설정</span>
        </S.SignTitle>
        <Form onFinish={onSubmit} autoComplete="off">
          <Form.Item>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={onChange}
                  value={value}
                  placeholder="이메일 주소(ID)를 입력해 주세요"
                />
              )}
            />
            {errors.email?.message}
          </Form.Item>
          <Form.Item>
            <S.SignConfirmWrap>
              <div>
                <Link href="/">
                  <a>홈으로</a>
                </Link>
              </div>
              <Button type="primary" htmlType="submit" size={"large"}>
                링크 전송
              </Button>
            </S.SignConfirmWrap>
          </Form.Item>
        </Form>
      </S.SignContent>
    </S.SignWrap>
  );
}
