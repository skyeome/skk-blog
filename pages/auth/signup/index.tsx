import { notification } from "antd";
import Signup from "../../../src/components/units/auth/signup/Signup.index";
import Head from "next/head";

export default function SignUpPage(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <Signup api={api} contextHolder={contextHolder} />
    </>
  );
}
