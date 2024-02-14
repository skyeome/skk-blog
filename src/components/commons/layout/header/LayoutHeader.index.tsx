import Image from "next/image";
import * as S from "./LayoutHeader.styles";
import Link from "next/link";
import { AuthUser } from "./LayoutAuthUser.index";
import { memo } from "react";
import { Button, Col, Row } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface IHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

function LayoutHeader(props: IHeaderProps): JSX.Element {
  return (
    <S.HeaderWrap>
      <Row align="middle">
        <Col xs={8} sm={8} md={6} lg={8} xl={10}>
          <Button
            type="text"
            onClick={props.toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {props.collapsed ? (
              <MenuUnfoldOutlined rev={undefined} />
            ) : (
              <MenuFoldOutlined rev={undefined} />
            )}
          </Button>
        </Col>
        <Col xs={8} sm={8} md={12} lg={8} xl={4}>
          <S.Logo>
            <Link href="/">
              <a>
                <Image
                  src="https://s3.ap-northeast-2.amazonaws.com/skkblog.com/seri.diary-logo.webp"
                  width={104}
                  height={68}
                  objectFit="cover"
                />
              </a>
            </Link>
          </S.Logo>
        </Col>
        <Col xs={8} sm={8} md={6} lg={8} xl={10}>
          <AuthUser />
        </Col>
      </Row>
    </S.HeaderWrap>
  );
}
export default memo(LayoutHeader);
