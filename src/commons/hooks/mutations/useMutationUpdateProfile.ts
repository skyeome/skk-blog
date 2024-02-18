import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileFormSchema } from "../../libraries/yup";
import type { ProfileForm } from "../../../components/units/mypage/EditProfileForm.types";
import type { ShowToastParams } from "../custom/useToast";
import type { UserInfo } from "../../libraries/firestore";

const useMutationUpdateProfile = (
  showToast: ShowToastParams,
  data?: UserInfo
) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<ProfileForm>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      nickname: data !== undefined ? data.nickname : "",
      desc: data !== undefined ? data.desc : "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  // 이미지 base64
  const [image, setImage] = useState<string>();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const passwordWatch = watch("password");
  const passwordCheckWatch = watch("passwordCheck");
  useEffect(() => {
    if (passwordWatch === "") {
      setValue("password", undefined);
      clearErrors();
    }
    if (passwordCheckWatch === "") {
      setValue("passwordCheck", undefined);
      clearErrors();
    }
  }, [passwordWatch, passwordCheckWatch]);

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.passwordCheck) {
      setError("passwordCheck", {
        type: "invalid-password",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    showToast("success", "정보가 저장되었습니다.");
  });

  return {
    control,
    errors,
    onSubmit,
    showPassword,
    showPasswordConfirm,
    handleClickShowPassword,
    handleClickShowPasswordConfirm,
    handleMouseDownPassword,
    image,
    setImage,
  };
};

export default useMutationUpdateProfile;
