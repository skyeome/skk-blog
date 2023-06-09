import type { NotificationInstance } from "antd/es/notification/interface";
import type { JSXElementConstructor, ReactElement } from "react";

export interface SignInInputType {
  userId: string;
  password: string;
}

export interface ISigninProps {
  api: NotificationInstance;
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>;
}
