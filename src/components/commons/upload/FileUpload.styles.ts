import styled from "@emotion/styled";

export const HidedInput = styled.input`
  visibility: hidden;
`;

export const FileUploadWrap = styled.div`
  border-radius: 5px;
  border: 1px dashed #000;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding: 5px;
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
