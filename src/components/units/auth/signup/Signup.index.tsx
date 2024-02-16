import Link from "next/link";
import { Controller } from "react-hook-form";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutationCreateUser } from "../../../../commons/hooks/mutations/useMutationCreateUser";
import Toast from "../../../commons/layout/toast/Toast";
import useToast from "../../../../commons/hooks/custom/useToast";
import * as S from "./Signup.styles";

export default function Signup(): JSX.Element {
  const { openToast, severity, messageToast, closeToast, showToast } =
    useToast();
  const {
    control,
    errors,
    onSubmit,
    showPassword,
    showPasswordConfirm,
    handleClickShowPassword,
    handleClickShowPasswordConfirm,
    handleMouseDownPassword,
  } = useMutationCreateUser(showToast);
  return (
    <S.SignContent>
      <S.SignTitle>
        이메일로 <span>가입하기</span>
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
                placeholder="수신 가능한 이메일 주소(ID)를 입력해 주세요"
                sx={{ mb: 1 }}
                fullWidth
              />
            )}
          />
          <Typography variant="caption" component="p" mb={2}>
            {errors.userId?.message}
          </Typography>
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
                sx={{ mb: 1 }}
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
                fullWidth
              />
            )}
          />
          <Typography variant="caption" component="p" mb={2}>
            {errors.password?.message}
          </Typography>
        </div>
        <div>
          <Controller
            name="password2"
            control={control}
            render={({ field: { onChange, value } }) => (
              <OutlinedInput
                type={showPasswordConfirm ? "text" : "password"}
                onChange={onChange}
                value={value}
                placeholder="비밀번호를 확인해 주세요"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
              />
            )}
          />
          <Typography variant="caption">{errors.password2?.message}</Typography>
        </div>
        <div>
          <Controller
            name="nickname"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                placeholder="닉네임을 입력해 주세요"
                sx={{ mt: 2, mb: 2 }}
                fullWidth
              />
            )}
          />
          {errors.nickname?.message}
        </div>
        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              필수 약관에 모두 동의합니다
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Controller
                  name="term"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                          checked={Boolean(value)}
                        />
                      }
                      label="[필수] 이용약관에 동의"
                    />
                  )}
                />
                <Typography variant="caption">
                  {errors.term?.message}
                </Typography>
              </div>
              <div>
                <Controller
                  name="term2"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                          checked={Boolean(value)}
                        />
                      }
                      label="[필수] 개인정보 수집 및 이용에 동의"
                    />
                  )}
                />
                <Typography variant="caption">
                  {errors.term2?.message}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <S.SignConfirmWrap>
            <div>
              <Link href="/">
                <a>홈으로</a>
              </Link>
              <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
              <Link href="/auth/signin">
                <a>로그인하기</a>
              </Link>
            </div>
            <Button variant="contained" type="submit" size="large">
              회원가입
            </Button>
          </S.SignConfirmWrap>
        </div>
      </form>
      <Toast
        open={openToast}
        severity={severity}
        message={messageToast}
        closeToast={closeToast}
      />
    </S.SignContent>
  );
}
