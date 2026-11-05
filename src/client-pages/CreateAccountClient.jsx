"use client";

import dynamic from "next/dynamic";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PageLoader from "@/components/PageLoader";
import { GOOGLE_CLIENT_ID } from "@/lib/google";

// Rendered client-side only: this page depends on browser state (localStorage,
// auth tokens) during render. Google OAuth is provided here, not site-wide.
const CreateAccount = dynamic(() => import("@/views/userOnboarding/CreateAccount"), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function CreateAccountClient() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CreateAccount />
    </GoogleOAuthProvider>
  );
}
