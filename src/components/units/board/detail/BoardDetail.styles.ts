import styled from "@emotion/styled";
export const topKv = styled.div<{ bg: string | undefined }>`
  background: url(${(props) => (props.bg === "" ? "/kv-image.jpg" : props.bg)})
    50% 50% / cover no-repeat;
  aspect-ratio: 2/1;
  /* height: 500px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 50px;
`;
export const topKvBox = styled.div`
  width: 88%;
  max-width: 37.5em;
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
  > p {
    display: inline-block;
    color: #888;
    font-size: 0.8125em;
    font-weight: 400;
    line-height: 1;
    margin: 0 6px;
  }
`;
export const BoardLikeWrap = styled.div`
  width: 150px;
  height: 48px;
  border: 2px solid rgb(255, 77, 79);
  border-radius: 10px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  flex-direction: row;
`;

export const BoardLikeCount = styled.div`
  flex: 1;
`;
export const BoardLikeBtn = styled.div`
  width: 90px;
`;
