import { Button, Form, Input } from "antd";
import Link from "next/link";
import * as S from "../signup/Signup.styles";
import { Controller } from "react-hook-form";
import type { ISigninProps } from "./Signin.types";

import { useMutationLoginUser } from "../../../../commons/hooks/mutations/useMutationLoginUser";

export default function Signin(props: ISigninProps): JSX.Element {
  const { control, errors, onSubmit } = useMutationLoginUser(props.api);

  return (
    <S.SignWrap>
      {props.contextHolder}
      <S.SignContent>
        <S.SignTitle>
          이메일로 <span>로그인</span>
        </S.SignTitle>
        <Form onFinish={onSubmit} autoComplete="off">
          <Form.Item>
            <Controller
              name="userId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={onChange}
                  value={value}
                  placeholder="이메일 주소(ID)를 입력해 주세요"
                />
              )}
            />
            {errors.userId?.message}
          </Form.Item>
          <Form.Item>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.Password
                  onChange={onChange}
                  value={value}
                  placeholder="비밀번호를 입력해 주세요"
                />
              )}
            />
            {errors.password?.message}
            <S.SignDesc>
              비밀번호를 잊으셨나요? <span>&nbsp;</span>
              <Link href="/auth/find-password">
                <S.SignResetPass>비밀번호 재설정</S.SignResetPass>
              </Link>
            </S.SignDesc>
          </Form.Item>
          <Form.Item>
            <S.SignConfirmWrap>
              <div>
                <Link href="/">
                  <a>홈으로</a>
                </Link>
                <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                <Link href="/auth/signup">
                  <a>가입하기</a>
                </Link>
              </div>
              <Button type="primary" htmlType="submit" size={"large"}>
                로그인
              </Button>
            </S.SignConfirmWrap>
          </Form.Item>
        </Form>
      </S.SignContent>
    </S.SignWrap>
  );
}
