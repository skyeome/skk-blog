import Link from "next/link";
import { Controller } from "react-hook-form";
import { useMutationLoginUser } from "../../../../commons/hooks/mutations/useMutationLoginUser";
import Toast from "../../../commons/layout/toast/Toast";
import useToast from "../../../../commons/hooks/custom/useToast";
import * as S from "../signup/Signup.styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Signin(): JSX.Element {
  const { openToast, severity, messageToast, closeToast, showToast } =
    useToast();
  const {
    control,
    errors,
    onSubmit,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = useMutationLoginUser(showToast);

  return (
    <S.SignWrap>
      <S.SignContent>
        <S.SignTitle>
          이메일로 <span>로그인</span>
        </S.SignTitle>
        <form onSubmit={onSubmit} autoComplete="off">
          <div>
            <Controller
              name="userId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  placeholder="이메일 주소(ID)를 입력해 주세요"
                  sx={{ mb: 2 }}
                  fullWidth
                />
              )}
            />
            {errors.userId?.message}
          </div>
          <div>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={onChange}
                  value={value}
                  placeholder="비밀번호를 입력해 주세요"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password?.message}
            <S.SignDesc>
              비밀번호를 잊으셨나요? <span>&nbsp;</span>
              <Link href="/auth/find-password">
                <S.SignResetPass>비밀번호 재설정</S.SignResetPass>
              </Link>
            </S.SignDesc>
          </div>
          <S.SignConfirmWrap>
            <div>
              <Link href="/">
                <a>홈으로</a>
              </Link>
              <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
              <Link href="/auth/signup">
                <a>가입하기</a>
              </Link>
            </div>
            <Button variant="contained" type="submit" size="large">
              로그인
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
