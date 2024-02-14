import { useState } from "react";
import LayoutFooter from "./footer/LayoutFooter.index";
import type { MenuProps } from "antd";
import { AppstoreOutlined, CommentOutlined } from "@ant-design/icons";
import { Wrapper } from "./header/LayoutHeader.styles";
import Link from "next/link";
import LayoutHeaderIndex from "./header/LayoutHeader.index";
import LayoutSider from "./sider/LayoutSider.index";
import LayoutBanner from "./banner/LayoutBanner";
interface ILayoutProps {
  children: JSX.Element;
}
export type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MENU_ITEMS: MenuItem[] = [
  getItem("게시판", "sub1", <CommentOutlined rev={undefined} />, [
    getItem(
      <Link href="/free">
        <a>자유게시판</a>
      </Link>,
      "1"
    ),
    getItem(
      <Link href="/notice">
        <a>공지사항</a>
      </Link>,
      "2"
    ),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),

  getItem("마이페이지", "sub2", <AppstoreOutlined rev={undefined} />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
  ]),
];
export default function Layout(props: ILayoutProps): JSX.Element {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <LayoutHeaderIndex
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      <LayoutBanner />
      <main style={{ minHeight: "calc(100vh - 100px)" }}>
        <Wrapper>{props.children}</Wrapper>
      </main>
      <LayoutFooter />
      <LayoutSider
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        items={MENU_ITEMS}
      />
    </>
  );
}
