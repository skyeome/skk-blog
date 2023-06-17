import { useRouter } from "next/router";
import { useState } from "react";

export const useLayoutCheck = (): { isHeaderFooter: boolean } => {
  const [isHeaderFooter, setIsHeaderFooter] = useState(true);
  const router = useRouter();
  if (
    router.pathname === "/auth/signup" ||
    router.pathname === "/auth/signin"
  ) {
    setIsHeaderFooter(false);
  }

  return {
    isHeaderFooter,
  };
};
