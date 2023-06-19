import type { BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../libraries/firebase";
import { useForm } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../libraries/yup";
import type { SignUpInputType } from "../../../components/units/auth/signup/Signup.types";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { NotificationInstance } from "antd/es/notification/interface";

export const useMutationCreateUser = (
  api: NotificationInstance
): {
  control: Control<SignUpInputType, any>;
  errors: FieldErrors<SignUpInputType>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
} => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpInputType>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data: SignUpInputType) => {
    createUserWithEmailAndPassword(auth, data.userId, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        addDoc(collection(db, "User"), {
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
              api.error({ message: error.message });
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);
      });
  });

  return {
    control,
    errors,
    onSubmit,
  };
};
