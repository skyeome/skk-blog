import { useRef } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import type { Editor } from "@toast-ui/react-editor";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import type { IBoardWriteProps } from "./BoardWrite.types";
import Toast from "../../../commons/layout/toast/Toast";
import useToast from "../../../../commons/hooks/custom/useToast";
import FileUpload from "../../../commons/upload/FileUpload.container";
import { useMutationCreateBoard } from "../../../../commons/hooks/mutations/useMutationCreateBoard";
import type { LangTag } from "../../../../commons/types/tag";

const TuiEditor = dynamic(
  async () => await import("../../../commons/editor/TuiEditor"),
  { ssr: false }
);

interface Language {
  label: LangTag;
  value: LangTag;
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
    fileUrl,
    setFileUrl,
    setValue,
    onClickWrite,
    onClickUpdate,
  } = useMutationCreateBoard(showToast, editorRef, data);

  return (
    <form onSubmit={isEdit ? onClickUpdate : onClickWrite} autoComplete="off">
      <div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              defaultValue={data?.title}
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
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>#태그</InputLabel>
              <Select
                multiple
                {...field}
                defaultValue={data !== undefined ? data.category : []}
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
      <FileUpload
        showToast={showToast}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
        setValue={setValue}
      />
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
