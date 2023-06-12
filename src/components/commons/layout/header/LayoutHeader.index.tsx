import Image from "next/image";
import * as S from "./LayoutHeader.styles";
import Link from "next/link";

const MENU_ITEMS = [
  { link: "/free", text: "자유게시판" },
  { link: "/notice", text: "공지사항" },
];

export default function LayoutHeader(): JSX.Element {
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
          <S.HeaderUsers>
            <S.LinkBtn type="link">로그인</S.LinkBtn>
            <S.LinkBtn type="text">회원가입</S.LinkBtn>
          </S.HeaderUsers>
        </S.HeaderWrap>
      </S.Header>
    </>
  );
}
