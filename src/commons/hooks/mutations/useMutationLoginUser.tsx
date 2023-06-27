import type { BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";
import type { Control, FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { SignInInputType } from "../../../components/units/auth/signin/Signin.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../libraries/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../libraries/firebase";
import type { NotificationInstance } from "antd/es/notification/interface";

export const useMutationLoginUser = (
  api: NotificationInstance
): {
  control: Control<SignInInputType, any>;
  errors: FieldErrors<SignInInputType>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
} => {
  const router = useRouter();
  console.log(router);
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
        // void router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        )
          api.error({ message: "이메일 혹은 비밀번호가 다릅니다." });
      });
  });

  return {
    control,
    errors,
    onSubmit,
  };
};
