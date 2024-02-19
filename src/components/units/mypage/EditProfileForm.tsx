import { useQuery } from "react-query";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import useToast from "../../../commons/hooks/custom/useToast";
import Toast from "../../commons/layout/toast/Toast";
import useMutationUpdateProfile from "../../../commons/hooks/mutations/useMutationUpdateProfile";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getMyInfo } from "../../../commons/apis/mypage";
import { useRecoilValue } from "recoil";
import { userState } from "../../../commons/stores";
import EditProfileImage from "./EditProfileImage";

function EditProfileForm() {
  const user = useRecoilValue(userState);
  const { data, refetch } = useQuery({
    queryKey: ["mypage", "userInfo"],
    queryFn: async () => await getMyInfo(user?.uid),
  });
  const { openToast, severity, messageToast, closeToast, showToast } =
    useToast();
  const {
    control,
    errors,
    onSubmit,
    password,
    image,
    setImage,
    handleDeleteImage,
  } = useMutationUpdateProfile(showToast, refetch, data);

  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <EditProfileImage
        image={user?.photoURL !== null ? user?.photoURL : undefined}
        newImage={image}
        setImage={setImage}
        handleDeleteImage={handleDeleteImage}
      />
      <form onSubmit={onSubmit} autoComplete="off">
        <Grid container alignItems="center" mb={2}>
          <Grid item xs={12} sm={3}>
            <FormLabel htmlFor="nickname">
              <Typography variant="h3" mb={1}>
                닉네임
              </Typography>
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
              name="nickname"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="nickname"
                  onChange={onChange}
                  value={value}
                  placeholder="개성있는 닉네임을 입력해보세요."
                  sx={{ mb: 1 }}
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
            <Typography variant="caption" component="p">
              {errors.nickname?.message}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" mb={2}>
          <Grid item xs={12} sm={3}>
            <FormLabel htmlFor="desc">
              <Typography variant="h3" mb={1}>
                설명글
              </Typography>
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
              name="desc"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="desc"
                  onChange={onChange}
                  value={value}
                  placeholder="회원님에 대해 자세히 설명해주세요."
                  sx={{ mb: 1 }}
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
            <Typography variant="caption" component="p">
              {errors.desc?.message}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" mb={2}>
          <Grid item xs={12} sm={3}>
            <FormLabel htmlFor="password">
              <Typography variant="h3" mb={1}>
                비밀번호
              </Typography>
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <OutlinedInput
                  type={password.showPassword ? "text" : "password"}
                  onChange={onChange}
                  value={value}
                  placeholder="변경하실 비밀번호를 입력해주세요."
                  sx={{ mb: 1 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={password.handleClickShowPassword}
                        onMouseDown={password.handleMouseDownPassword}
                        edge="end"
                      >
                        {password.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="new-password"
                  fullWidth
                />
              )}
            />
            <Typography variant="caption" component="p">
              {errors.password?.message}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" mb={2}>
          <Grid item xs={12} sm={3}>
            <FormLabel htmlFor="passwordCheck">
              <Typography variant="h3" mb={1}>
                비밀번호 확인
              </Typography>
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
              name="passwordCheck"
              control={control}
              render={({ field: { onChange, value } }) => (
                <OutlinedInput
                  type={password.showPasswordConfirm ? "text" : "password"}
                  onChange={onChange}
                  value={value}
                  placeholder="변경하실 비밀번호를 다시 입력해주세요."
                  sx={{ mb: 1 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={password.handleClickShowPasswordConfirm}
                        onMouseDown={password.handleMouseDownPassword}
                        edge="end"
                      >
                        {password.showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="new-password"
                  fullWidth
                />
              )}
            />
            <Typography variant="caption" component="p">
              {errors.passwordCheck?.message}
            </Typography>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" size="large">
            저장하기
          </Button>
        </Stack>
      </form>
      <Toast
        open={openToast}
        severity={severity}
        message={messageToast}
        closeToast={closeToast}
      />
    </Container>
  );
}

export default EditProfileForm;
