import { Menu, Layout } from "antd";
import * as S from "./LayoutSider.styles";
import type { MenuItem } from "..";
const { Sider } = Layout;

interface ISiderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  items: MenuItem[];
}

const LayoutSider = (props: ISiderProps): JSX.Element => {
  return (
    <S.FixedDimmed collapsed={props.collapsed} onClick={props.toggleCollapsed}>
      <S.FixedSiderWrap>
        <Sider
          theme="dark"
          trigger={null}
          collapsedWidth={0}
          collapsed={props.collapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            theme="dark"
            items={props.items}
          />
        </Sider>
      </S.FixedSiderWrap>
    </S.FixedDimmed>
  );
};

export default LayoutSider;
