import { Button, Checkbox, Form, Input, Collapse } from "antd";
import Link from "next/link";
import * as S from "./Signup.styles";
import { Controller } from "react-hook-form";

import { useMutationCreateUser } from "../../../../commons/hooks/mutations/useMutationCreateUser";
import type { ISignupProps } from "./Signup.types";

export default function Signup(props: ISignupProps): JSX.Element {
  const { control, errors, onSubmit } = useMutationCreateUser(props.api);
  return (
    <S.SignWrap>
      {props.contextHolder}
      <S.SignContent>
        <S.SignTitle>
          이메일로 <span>가입하기</span>
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
                  placeholder="수신 가능한 이메일 주소(ID)를 입력해 주세요"
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
          </Form.Item>
          <Form.Item>
            <Controller
              name="password2"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.Password
                  onChange={onChange}
                  value={value}
                  placeholder="비밀번호를 확인해 주세요"
                />
              )}
            />
            {errors.password2?.message}
            <S.SignDesc>
              <strong>영문 숫자 특수기호 조합 8자리 이상</strong>으로
              입력해주세요
            </S.SignDesc>
          </Form.Item>
          <Form.Item>
            <Controller
              name="nickname"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={onChange}
                  value={value}
                  placeholder="닉네임을 입력해 주세요"
                />
              )}
            />
            {errors.nickname?.message}
          </Form.Item>
          <div>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel header="필수 약관에 모두 동의합니다" key="1">
                <S.SignCheckDesc>
                  <Controller
                    name="term"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                        onChange={(e) => onChange(e.target.checked)}
                        checked={Boolean(value)}
                      >
                        [필수] 이용약관에 동의
                      </Checkbox>
                    )}
                  />
                  {errors.term?.message}
                </S.SignCheckDesc>
                <S.SignCheckDesc>
                  <Controller
                    name="term2"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                        onChange={(e) => onChange(e.target.checked)}
                        checked={Boolean(value)}
                      >
                        [필수] 개인정보 수집 및 이용에 동의
                      </Checkbox>
                    )}
                  />
                  {errors.term2?.message}
                </S.SignCheckDesc>
              </Collapse.Panel>
            </Collapse>
          </div>
          <Form.Item>
            <S.SignConfirmWrap>
              <div>
                <Link href="/">
                  <a>홈으로</a>
                </Link>
                <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                <Link href="/auth/signin">
                  <a>로그인하기</a>
                </Link>
              </div>
              <Button type="primary" htmlType="submit" size={"large"}>
                회원가입
              </Button>
            </S.SignConfirmWrap>
          </Form.Item>
        </Form>
      </S.SignContent>
    </S.SignWrap>
  );
}
