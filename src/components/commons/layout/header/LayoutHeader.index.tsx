import Image from "next/image";
import * as S from "./LayoutHeader.styles";
import Link from "next/link";
import { AuthUser } from "./LayoutAuthUser.index";
import { memo } from "react";

const MENU_ITEMS = [
  { link: "/free", text: "자유게시판" },
  { link: "/notice", text: "공지사항" },
];

function LayoutHeader(): JSX.Element {
  return (
    <>
      <S.Header>
        <S.HeaderWrap>
          <S.HeaderLeft>
            <S.Logo>
              <Link href="/">
                <a>
                  <Image src="/logo.png" width={353} height={150} />
                </a>
              </Link>
            </S.Logo>
            <S.HeaderNav>
              {MENU_ITEMS.map((el) => (
                <li key={el.link}>
                  <S.NextLink href={el.link}>
                    <a>{el.text}</a>
                  </S.NextLink>
                </li>
              ))}
            </S.HeaderNav>
          </S.HeaderLeft>
          <AuthUser />
        </S.HeaderWrap>
      </S.Header>
    </>
  );
}
export default memo(LayoutHeader);
