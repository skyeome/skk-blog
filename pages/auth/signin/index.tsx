import { notification } from "antd";
import Signin from "../../../src/components/units/auth/signin/Singin.index";
import Head from "next/head";

export default function SignInPage(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <Signin api={api} contextHolder={contextHolder} />
    </>
  );
}
