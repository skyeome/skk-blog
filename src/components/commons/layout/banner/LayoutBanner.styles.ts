import styled from "@emotion/styled";
import device from "../../../../commons/styles/media";

export const LayoutBannerBox = styled.header`
  height: 15.5rem;
  background: #e2e2e4 url(/key-visual.webp) 50% 38% / 1440px no-repeat;

  h1 {
    text-indent: -9999em;
  }

  @media ${device.phone} {
    background-size: 64rem;
  }
`;
