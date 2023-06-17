import * as yup from "yup";

export const signUpSchema = yup.object({
  userId: yup
    .string()
    .required("이메일 주소(ID)를 입력해 주세요")
    .email("이메일 형식으로 입력해주세요"),
  password: yup
    .string()
    .required("비밀번호를 입력해 주세요")
    .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
      message: "영문 숫자 특수기호 조합 8자리 이상으로 입력해주세요",
    })
    .max(15, "비밀번호는 15자리 이하여야 합니다.")
    .min(8, "비밀번호는 8자리 이상이어야 합니다."),
  password2: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
      message: "영문 숫자 특수기호 조합 8자리 이상으로 입력해주세요",
    })
    .max(15, "비밀번호는 15자리 이하여야 합니다.")
    .min(8, "비밀번호는 8자리 이상이어야 합니다.")
    .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다."),
  term: yup.boolean().required("이용약관에 동의해주세요").oneOf([true]),
  term2: yup
    .boolean()
    .required("개인정보 수집 및 이용에 동의해주세요")
    .oneOf([true]),
});

export const signInSchema = yup.object({
  userId: yup
    .string()
    .required("이메일 주소(ID)를 입력해 주세요")
    .email("이메일 형식으로 입력해주세요"),
  password: yup
    .string()
    .required("비밀번호를 입력해 주세요")
    .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
      message: "영문 숫자 특수기호 조합 8자리 이상으로 입력해주세요",
    })
    .max(15, "비밀번호는 15자리 이하여야 합니다.")
    .min(8, "비밀번호는 8자리 이상이어야 합니다."),
});
