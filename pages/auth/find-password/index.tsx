import { notification } from "antd";
import FindPassword from "../../../src/components/units/auth/find/FindPassword.index";
import Head from "next/head";

export default function FindPasswordPage(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      <Head>
        <title>비밀번호 재설정</title>
      </Head>
      <FindPassword api={api} contextHolder={contextHolder} />
    </>
  );
}
