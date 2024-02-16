import { useState } from "react";
import type { BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";
import type { Control, FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { SignInInputType } from "../../../components/units/auth/signin/Signin.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../libraries/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../libraries/firebase";
import type { ShowToastParams } from "../custom/useToast";

export const useMutationLoginUser = (
  showToast: ShowToastParams
): {
  control: Control<SignInInputType, any>;
  errors: FieldErrors<SignInInputType>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  showPassword: boolean;
  handleClickShowPassword: VoidFunction;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
} => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInInputType>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit((data: SignInInputType) => {
    signInWithEmailAndPassword(auth, data.userId, data.password)
      .then((userCredential) => {
        router.back();
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        )
          showToast("error", "이메일 혹은 비밀번호가 다릅니다.");
      });
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return {
    control,
    errors,
    onSubmit,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
};
