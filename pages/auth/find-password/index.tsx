import FindPassword from "../../../src/components/units/auth/find/FindPassword.index";
import Head from "next/head";

export default function FindPasswordPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>비밀번호 재설정</title>
      </Head>
      <FindPassword />
    </>
  );
}
