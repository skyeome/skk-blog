import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../../commons/stores";

export const loginCheck = (Component: any) => (props: any) => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  useEffect(() => {
    if (user === null) {
      void router.push("/auth/signin");
    }
  }, [user]);

  return <Component {...props} />;
};
