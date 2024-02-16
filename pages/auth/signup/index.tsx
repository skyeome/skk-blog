import Signup from "../../../src/components/units/auth/signup/Signup.index";
import Head from "next/head";

export default function SignUpPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <Signup />
    </>
  );
}
