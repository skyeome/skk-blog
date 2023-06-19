import type { NotificationInstance } from "antd/es/notification/interface";
import type { JSXElementConstructor, ReactElement } from "react";

export interface IFindPasswordProps {
  api: NotificationInstance;
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>;
}

export interface FindPasswordType {
  email: string;
}
