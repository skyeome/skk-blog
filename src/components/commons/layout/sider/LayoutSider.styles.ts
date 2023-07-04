import styled from "@emotion/styled";

export const FixedDimmed = styled.div<{ collapsed: boolean }>`
  position: absolute;
  width: 100%;
  top: 100px;
  left: ${(props) => (props.collapsed ? "-110%" : 0)};
  height: calc(100vh - 100px);
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const FixedSiderWrap = styled.div`
  width: 200px;
  height: 100%;
  background-color: lightgray;
`;
