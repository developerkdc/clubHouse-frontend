import { useTheme } from "@emotion/react";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import React from "react";

const ToastAlerts = () => {
  const Swal = useSwalWrapper();
  const theme = useTheme();
  const sweetAlerts = (variant, msg) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      // onOpen: (toast) => {
      //   toast.addEventListener("mouseenter", Swal.stopTimer);
      //   toast.addEventListener("mouseleave", Swal.resumeTimer);
      // },
    });

    Toast.fire({
      icon: variant,
      title: msg,
      background: theme.palette.background.paper,
    });
  };

  return sweetAlerts;
};

export default ToastAlerts;
