import { Controller } from "react-hook-form";
import Link from "next/link";
import useToast from "../../../../commons/hooks/custom/useToast";
import Toast from "../../../commons/layout/toast/Toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutationResetEmail } from "../../../../commons/hooks/mutations/useMutationResetEmail";
import * as S from "../signup/Signup.styles";

export default function FindPassword(): JSX.Element {
  const { openToast, severity, messageToast, closeToast, showToast } =
    useToast();
  const { control, errors, onSubmit } = useMutationResetEmail(showToast);
  return (
    <S.SignWrap>
      <S.SignContent>
        <S.SignTitle>
          비밀번호 <span>재설정</span>
        </S.SignTitle>
        <form onSubmit={onSubmit} autoComplete="off">
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  placeholder="이메일 주소(ID)를 입력해 주세요"
                  fullWidth
                />
              )}
            />
            {errors.email?.message}
          </div>
          <S.SignConfirmWrap>
            <Link href="/">
              <a>홈으로</a>
            </Link>
            <Button variant="contained" type="submit" size="large">
              링크 전송
            </Button>
          </S.SignConfirmWrap>
        </form>
      </S.SignContent>
      <Toast
        open={openToast}
        severity={severity}
        message={messageToast}
        closeToast={closeToast}
      />
    </S.SignWrap>
  );
}
