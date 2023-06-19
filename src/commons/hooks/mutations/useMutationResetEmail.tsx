import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/router";
import type { Control, FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { resetPassSchema } from "../../libraries/yup";
import type { FindPasswordType } from "../../../components/units/auth/find/FindPassword.types";
import type { BaseSyntheticEvent } from "react";
import type { NotificationInstance } from "antd/es/notification/interface";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../libraries/firebase";

export const useMutationResetEmail = (
  api: NotificationInstance
): {
  control: Control<FindPasswordType, any>;
  errors: FieldErrors<FindPasswordType>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
} => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FindPasswordType>({
    resolver: yupResolver(resetPassSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data: FindPasswordType) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        api.success({ message: "비밀번호 재설정 이메일 전송완료" });
        // void router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        if (errorCode === "auth/user-not-found") {
          api.error({ message: "이메일을 찾을 수 없습니다." });
        }
      });
  });

  return {
    control,
    errors,
    onSubmit,
  };
};
