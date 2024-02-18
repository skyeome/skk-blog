/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AvatarEditor from "react-avatar-editor";
import useModal from "../../../commons/hooks/custom/useModal";
import type { EditProfileImageProps } from "./EditProfileImage.types";
import {
  AvatarBox,
  HiddenInput,
  ProfileDelBtn,
} from "./EditProfileImage.styles";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

function EditProfileImage({
  image,
  newImage,
  setImage,
  handleDeleteImage,
}: EditProfileImageProps) {
  const editor = useRef<AvatarEditor>(null);
  const input = useRef<HTMLInputElement>(null);
  const [slideValue, setSlideValue] = useState(10);
  const { open, handleOpen, handleClose } = useModal();

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (input.current != null) input.current.click();
  };
  const handleEditProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    handleOpen();
    if (e.target?.files && e.target?.files[0])
      setImage(URL.createObjectURL(e.target.files[0]));
    // 파일 초기화!
    if (input.current != null) input.current.value = "";
  };
  const handleChangeSlider = (_: Event, newValue: number | number[]) => {
    setSlideValue(newValue as number);
  };
  // 모달에서 취소를 눌렀을때
  const handleClickReset = () => {
    setImage(undefined);
    handleClose();
  };
  // 모달에서 확인을 눌렀을때
  const handleClickSave = async () => {
    if (editor.current === null) return;
    const dataUrl = editor.current.getImageScaledToCanvas().toDataURL();
    setImage(dataUrl);
    handleClose();
  };

  return (
    <div>
      <AvatarBox>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={newImage !== undefined ? newImage : image}
            sx={{ width: 100, height: 100, mb: 1 }}
          />
          <Tooltip title="이미지 삭제">
            <ProfileDelBtn
              size="small"
              color="error"
              onClick={handleDeleteImage}
            >
              <DeleteIcon fontSize="small" />
            </ProfileDelBtn>
          </Tooltip>
        </Box>
        <HiddenInput
          type="file"
          accept="image/*"
          ref={input}
          onChange={handleEditProfile}
        />
        <Button onClick={handleInputClick} startIcon={<CloudUploadIcon />}>
          이미지 업로드
        </Button>
      </AvatarBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">프로필 이미지 편집</DialogTitle>
        <DialogContent>
          <AvatarEditor
            ref={editor}
            image={newImage ?? "https://i.imgur.com/PWZeQcP.png"}
            width={240}
            height={240}
            border={10}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={slideValue / 10}
            rotate={0}
          />
          <Slider
            min={10}
            max={50}
            size="medium"
            defaultValue={slideValue}
            value={slideValue}
            onChange={handleChangeSlider}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickReset}>취소</Button>
          <Button variant="contained" onClick={handleClickSave} autoFocus>
            완료
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfileImage;
