import type { NotificationInstance } from "antd/es/notification/interface";
import type { JSXElementConstructor, ReactElement } from "react";
export interface SignUpInputType {
  userId: string;
  nickname: string;
  password: string;
  password2: string;
  term: boolean;
  term2: boolean;
}
export interface ISignupProps {
  api: NotificationInstance;
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>;
}
