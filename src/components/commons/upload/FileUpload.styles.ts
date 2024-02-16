import styled from "@emotion/styled";

export const HidedInput = styled.input`
  visibility: hidden;
  width: 0;
  height: 0;
  opacity: 0;
`;

export const FileUploadWrap = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;
  padding: 5px;
  border-radius: 5px;
  border: 1px dashed #000;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: mediumblue;
    border-color: mediumblue;
    transition: color 0.3s, border-color 0.3s;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
