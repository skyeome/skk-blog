import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import type { AlertProps } from "@mui/material/Alert";
import { Slide } from "@mui/material";
import type { SlideProps } from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ToastProps {
  open: boolean;
  severity: "success" | "error" | "warning" | "info";
  message: string;
  closeToast: () => void;
}

export default function Toast({
  open,
  severity,
  message,
  closeToast,
}: ToastProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={2500}
      onClose={closeToast}
      TransitionComponent={SlideTransition}
    >
      <Alert
        severity={severity}
        sx={{ width: "100%", fontSize: 15, fontWeight: 600 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
