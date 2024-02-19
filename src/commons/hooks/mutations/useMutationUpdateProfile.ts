import { useEffect, useState } from "react";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileFormSchema } from "../../libraries/yup";
import type { ProfileForm } from "../../../components/units/mypage/EditProfileForm.types";
import type { ShowToastParams } from "../custom/useToast";
import type { UserInfo } from "../../libraries/firestore";
import { deleteProfileImage, updateMyInfo } from "../../apis/mypage";

const useMutationUpdateProfile = (
  showToast: ShowToastParams,
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserInfo | undefined, unknown>>,
  data?: UserInfo
) => {
  // react-hook-form ProfileForm
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
  // 비밀번호 보이기 state
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  // 이미지 base64
  const [image, setImage] = useState<string>();

  // 비밀번호 보이기 토글 함수
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

  // 비밀번호 비어있으면 오류 제거
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

  // 저장하기 버튼 클릭시 작업
  const onSubmit = handleSubmit(async (formData) => {
    const updateData = { ...formData, uid: data?.uid ?? "", image };
    // 설명글의 경우 빈 값일경우 db에도 빈값으로 넣어주어 변경해야함.
    if (updateData.desc === undefined) {
      updateData.desc = "";
    }
    // 만약 이전 값과 같다면 그냥 undefined로 해서 update값에 안넘어가게 한다.
    if (formData.nickname === data?.nickname) updateData.nickname = undefined;
    if (formData.desc === data?.desc) updateData.desc = undefined;
    if (formData.password !== formData.passwordCheck) {
      setError("passwordCheck", {
        type: "invalid-password",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    try {
      await updateMyInfo(updateData);
      await refetch();
      showToast("success", "정보가 저장되었습니다.");
    } catch (error) {
      showToast("error", "정보가 저장에 실패했습니다.");
    }
  });

  const handleDeleteImage = async () => {
    const updateData = { uid: data?.uid ?? "", image: data?.avatarName ?? "" };
    try {
      await deleteProfileImage(updateData);
      await refetch();
      showToast("success", "이미지가 삭제 되었습니다.");
    } catch (error) {
      showToast("error", "이미지 삭제에 문제가 생겼습니다.");
    }
  };

  return {
    control,
    errors,
    onSubmit,
    password: {
      showPassword,
      showPasswordConfirm,
      handleClickShowPassword,
      handleClickShowPasswordConfirm,
      handleMouseDownPassword,
    },
    image,
    setImage,
    handleDeleteImage,
  };
};

export default useMutationUpdateProfile;
