export interface SignUpInputType {
  userId: string;
  nickname: string;
  password: string;
  password2?: string | undefined;
  term: NonNullable<boolean | undefined>;
  term2: NonNullable<boolean | undefined>;
}
