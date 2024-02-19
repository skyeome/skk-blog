import Head from "next/head";
import { loginCheck } from "../../../src/components/commons/hocs/loginCheck";
import EditProfileForm from "../../../src/components/units/mypage/EditProfileForm";

function EditProfilePage() {
  return (
    <>
      <Head>
        <title>내 정보 관리</title>
      </Head>
      <EditProfileForm />
    </>
  );
}

export default loginCheck(EditProfilePage);
