import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 0 15px;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;
export const HeaderWrap = styled.div`
  padding: 0 15px;
  width: 100%;
  max-width: 1024px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 999;
`;

export const HeaderNav = styled.ul`
  display: flex;
  margin-left: 0px;
  list-style: none;
  li {
    margin-right: 10px;
    a {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
export const HeaderUsers = styled.div`
  width: fit-content;
  margin-left: auto;
`;
export const Logo = styled.h1<{ collapsed?: boolean }>`
  /* width: ${(props) => (props.collapsed === true ? "40px" : "104px")};
  height: ${(props) => (props.collapsed === true ? "33px" : "68px")};
  margin-left: auto;
  margin-right: auto; */
  width: 100%;
  aspect-ratio: 1.53;
  a {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
`;
