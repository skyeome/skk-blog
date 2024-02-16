import styled from "@emotion/styled";

export const SignWrap = styled.div`
  height: calc(100vh - 210px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SignContent = styled.div`
  width: 100%;
  max-width: 330px;
  margin-left: auto;
  margin-right: auto;
`;
export const SignTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  > span {
    color: #0958d9;
  }
`;
export const SignDesc = styled.p`
  margin-top: 6px;
  font-size: 12px;
  font-family: "Noto Sans KR", Arial, Helvetica, sans-serif;
  color: gray;
  strong {
    color: #111;
  }
`;
export const SignCheckDesc = styled.p`
  label {
    font-family: inherit;
    color: inherit;
    span {
      font-family: inherit;
      color: inherit;
    }
  }
  margin-top: 6px;
  font-size: 14px;
  font-family: "Noto Sans KR", Arial, Helvetica, sans-serif;
  color: gray;
`;
export const SignConfirmWrap = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Noto Sans KR", Arial, Helvetica, sans-serif;
  a {
    font-weight: bold;
  }
  button > span {
    font-family: "Noto Sans KR", Arial, Helvetica, sans-serif;
  }
`;

export const SignResetPass = styled.a`
  color: #333;
  font-weight: bold;
  cursor: pointer;
`;
