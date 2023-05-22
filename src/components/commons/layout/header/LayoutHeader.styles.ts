import styled from "@emotion/styled";
import { Button } from "antd";
import Link from "next/link";

export const Wrapper = styled.div`
  padding: 0 15px;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;
export const Header = styled.header`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
export const HeaderNav = styled.ul`
  display: flex;
  margin-left: 40px;
  list-style: none;
  li {
    margin-right: 10px;
    a {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
export const HeaderUsers = styled.div``;
export const Logo = styled.h1`
  width: 150px;
`;
export const LinkBtn = styled(Button)`
  font-family: "Noto Sans KR", sans-serif;
`;
export const NextLink = styled(Link)``;
