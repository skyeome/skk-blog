import { useRef } from "react";
import { Controller } from "react-hook-form";
import type { Editor } from "@toast-ui/react-editor";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import type { IBoardWriteProps } from "./BoardWrite.types";
import TuiEditor from "../../../commons/editor/TuiEditor";
import Toast from "../../../commons/layout/toast/Toast";
import useToast from "../../../../commons/hooks/custom/useToast";
import FileUpload from "../../../commons/upload/FileUpload.container";
import { FileUploadWrap } from "./BoardWrite.styles";
import { useMutationCreateBoard } from "../../../../commons/hooks/mutations/useMutationCreateBoard";

interface Language {
  label: string;
  value: string;
}

const options: Language[] = [
  { label: "Javascript", value: "Javascript" },
  { label: "Typescript", value: "Typescript" },
  { label: "React", value: "React" },
  { label: "Next.js", value: "Next.js" },
  { label: "Git", value: "Git" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BoardWrite({
  isEdit,
  data,
}: IBoardWriteProps): JSX.Element {
  const { openToast, severity, messageToast, closeToast, showToast } =
    useToast();

  const editorRef = useRef<Editor>(null);
  const {
    control,
    errors,
    fileUrls,
    onChangeFileUrls,
    onClickWrite,
    onClickUpdate,
  } = useMutationCreateBoard(showToast, editorRef, data);

  return (
    <form onSubmit={isEdit ? onClickUpdate : onClickWrite} autoComplete="off">
      <div>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              defaultValue={data?.title}
              onChange={onChange}
              value={value}
              placeholder="제목을 적어주세요."
              sx={{ mb: 2 }}
              fullWidth
            />
          )}
        />
        {errors.title?.message}
      </div>
      <div>
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <InputLabel>#태그</InputLabel>
              <Select
                multiple
                defaultValue={data !== undefined ? data.category : []}
                value={value}
                onChange={onChange}
                input={<Input />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value: string) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                sx={{ mb: 2 }}
              >
                {options.map((name) => (
                  <MenuItem key={name.label} value={name.value}>
                    {name.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors.category?.message}
      </div>
      <TuiEditor
        showToast={showToast}
        initialValue={data?.contents}
        editorRef={editorRef}
      />
      <FileUploadWrap>
        {fileUrls.map((el, index) => (
          <FileUpload
            key={uuidv4()}
            showToast={showToast}
            fileUrl={el}
            onChangeFileUrls={onChangeFileUrls}
            index={index}
          />
        ))}
      </FileUploadWrap>
      <Button variant="contained" type="submit" size="large">
        {isEdit ? "수정완료" : "작성완료"}
      </Button>
      <Toast
        open={openToast}
        severity={severity}
        message={messageToast}
        closeToast={closeToast}
      />
    </form>
  );
}
