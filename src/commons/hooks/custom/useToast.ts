import { useCallback, useState } from "react";

export type ShowToastParams = (
  newSeverity: "success" | "error" | "warning" | "info",
  newMessage: string
) => void;

export default function useToast() {
  // Toast
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [messageToast, setMessageToast] = useState("");
  const showToast: ShowToastParams = useCallback(
    (
      newSeverity: "success" | "error" | "warning" | "info",
      newMessage: string
    ) => {
      setSeverity(newSeverity);
      setMessageToast(newMessage);
      setOpenToast(true);
    },
    []
  );
  const closeToast = useCallback(() => {
    setMessageToast("");
    setOpenToast(false);
  }, []);

  return { openToast, severity, messageToast, closeToast, showToast };
}
