import { notification } from "antd";
import Signup from "../../../src/components/units/auth/signup/Signup.index";

export default function SignUpPage(): JSX.Element {
  const [api, contextHolder] = notification.useNotification();
  return <Signup api={api} contextHolder={contextHolder} />;
}
