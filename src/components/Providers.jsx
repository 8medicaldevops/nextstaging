"use client";

import { ToastProvider } from "react-toast-notifications";

// Site-wide providers only. Google OAuth is wrapped around the two pages that use it
// (SignInClient, CreateAccountClient), so its 100kB script is not loaded on every page.
export default function Providers({ children }) {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={6000} placement="bottom-center">
      {children}
    </ToastProvider>
  );
}
