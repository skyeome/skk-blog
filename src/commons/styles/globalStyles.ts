import { css } from "@emotion/react";

export const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-family: "Noto Sans KR", sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .toastui-editor-contents img {
    max-width: 100%;
  }
`;
