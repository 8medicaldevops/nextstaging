"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from "react-toast-notifications";

const GOOGLE_CLIENT_ID =
  "29064234798-89ki79v2rroat8nr0i7800u8fvnsa30m.apps.googleusercontent.com";

export default function Providers({ children }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ToastProvider autoDismiss autoDismissTimeout={6000} placement="bottom-center">
        {children}
      </ToastProvider>
    </GoogleOAuthProvider>
  );
}
