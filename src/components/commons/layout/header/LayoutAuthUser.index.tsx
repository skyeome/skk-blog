import { useEffect } from "react";
import { auth } from "../../../../commons/libraries/firebase";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { HeaderUsers, LinkBtn, NextLink } from "./LayoutHeader.styles";
import { useRecoilState } from "recoil";
import { userState } from "../../../../commons/stores";
// import { Avatar } from "antd";

export function AuthUser(): JSX.Element {
  const [user, setUser] = useRecoilState<User | null>(userState);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const userCopy = JSON.parse(JSON.stringify(user));
        setUser(userCopy);
      } else {
        setUser(null);
      }
    });
  }, []);

  const onClickLogout = (): void => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      {user !== null ? (
        <HeaderUsers>
          {/* <Avatar src={user?.photoURL ?? ""}>{user?.displayName}</Avatar> */}
          <LinkBtn type="text" onClick={onClickLogout}>
            로그아웃
          </LinkBtn>
        </HeaderUsers>
      ) : (
        <HeaderUsers>
          <LinkBtn type="link">
            <NextLink href={"/auth/signin"}>
              <a>로그인</a>
            </NextLink>
          </LinkBtn>
          <LinkBtn type="text">
            <NextLink href={"/auth/signup"}>
              <a>회원가입</a>
            </NextLink>
          </LinkBtn>
        </HeaderUsers>
      )}
    </>
  );
}
