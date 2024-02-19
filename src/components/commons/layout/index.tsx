import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import LayoutFooter from "./footer/LayoutFooter.index";
import LayoutHeaderIndex from "./header/LayoutHeader.index";
import LayoutSider from "./sider/LayoutSider.index";
import LayoutBanner from "./banner/LayoutBanner";
import Container from "@mui/material/Container";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isIndexPage = router.pathname === "/";
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      handleClose();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <>
      <LayoutHeaderIndex handleOpen={handleOpen} />
      {isIndexPage && <LayoutBanner />}
      <main style={{ minHeight: "calc(100vh - 100px)" }}>
        <Container maxWidth="md">{children}</Container>
      </main>
      <LayoutFooter />
      <LayoutSider open={open} handleClose={handleClose} />
    </>
  );
}
