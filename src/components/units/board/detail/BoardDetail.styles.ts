import styled from "@emotion/styled";
export const topThumb = styled.div`
  position: relative;
  aspect-ratio: 2/1;
`;
export const topKvBox = styled.div`
  background-color: #fff;
  padding: 2.5em;
  text-align: center;
`;

export const topKvTitle = styled.h2`
  font-size: 1.375em;
  margin-bottom: 1.25rem;
`;

export const topKvCategory = styled.h5`
  position: relative;
  display: inline-block;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  padding: 0 0.3125em;
  margin-bottom: 1.25em;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: rgba(228, 156, 134, 0.6);
    z-index: -1;
    transform: translateY(40%);
  }
`;
export const topKvInfos = styled.div`
  & svg {
    vertical-align: -0.25rem;
  }
`;
export const BoardLikeWrap = styled.div`
  width: 175px;
  height: 48px;
  border: 1px solid rgb(241, 243, 245);
  border-radius: 10px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgb(248, 249, 250);
  padding: 4px;
`;

export const BoardLikeCount = styled.div`
  flex: 1;
`;
export const BoardLikeBtn = styled.div`
  width: 100px;
  height: 36px;
  line-height: 36px;
  background-color: #fff;
  border: 1px solid rgb(241, 243, 245);
  border-radius: 6px;
  color: #ff4d4f;
  cursor: pointer;
  & > svg {
    vertical-align: middle;
  }
`;
