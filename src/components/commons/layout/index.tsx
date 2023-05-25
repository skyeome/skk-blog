import LayoutFooter from "./footer/LayoutFooter.container";
import LayoutHeader from "./header/LayoutHeader.container";
import { Wrapper } from "./header/LayoutHeader.styles";

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <LayoutHeader />
      <main>
        <Wrapper>{props.children}</Wrapper>
      </main>
      <LayoutFooter />
    </>
  );
}
