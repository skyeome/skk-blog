import styled from "@emotion/styled";

export const RatestListItem = styled.div<{ counts?: number }>`
  display: flex;
  gap: 1rem;

  width: ${(props) => (props.counts === undefined ? 100 : 100 / props.counts)}%;
  margin-bottom: 1.5rem;
`;
export const RatestItemThumb = styled.a`
  position: relative;
  display: block;
  width: 11.25rem;
  aspect-ratio: 1.34;
  overflow: hidden;
`;
export const RatestItemDesc = styled.div`
  flex: 1;
`;
