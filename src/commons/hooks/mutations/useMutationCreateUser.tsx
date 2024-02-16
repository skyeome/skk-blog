import { useState, type BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../libraries/firebase";
import { useForm } from "react-hook-form";
import type { Control, FieldErrors, UseFormTrigger } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../libraries/yup";
import type { SignUpInputType } from "../../../components/units/auth/signup/Signup.types";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import type { ShowToastParams } from "../custom/useToast";

export const useMutationCreateUser = (
  showToast: ShowToastParams
): {
  control: Control<SignUpInputType, any>;
  errors: FieldErrors<SignUpInputType>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  trigger: UseFormTrigger<SignUpInputType>;
  showPassword: boolean;
  showPasswordConfirm: boolean;
  handleClickShowPassword: VoidFunction;
  handleClickShowPasswordConfirm: VoidFunction;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
} => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm<SignUpInputType>({
    resolver: yupResolver(signUpSchema),
    mode: "all",
  });

  const onSubmit = handleSubmit((data: SignUpInputType) => {
    createUserWithEmailAndPassword(auth, data.userId, data.password)
      .then((userCredential) => {
        setDoc(doc(db, "User", userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          nickname: data.nickname,
          createdAt: serverTimestamp(),
        })
          .then(() => {
            void router.push("/auth/signin");
          })
          .catch((error) => {
            if (error instanceof Error) {
              showToast("error", error.message);
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use")
          showToast("error", "이미 사용중인 이메일 입니다.");
      });
  });

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

  return {
    control,
    errors,
    onSubmit,
    trigger,
    showPassword,
    showPasswordConfirm,
    handleClickShowPassword,
    handleClickShowPasswordConfirm,
    handleMouseDownPassword,
  };
};
