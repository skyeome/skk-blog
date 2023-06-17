import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import * as S from "../signup/Signup.styles";
import { Controller, useForm } from "react-hook-form";
import type { SignInInputType } from "./Signin.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../../commons/libraries/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../commons/libraries/firebase";

export default function Signin(): JSX.Element {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInInputType>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit((data: SignInInputType) => {
    signInWithEmailAndPassword(auth, data.userId, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        void router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);
      });
  });

  return (
    <S.SignWrap>
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
                <a>비밀번호 재설정</a>
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
