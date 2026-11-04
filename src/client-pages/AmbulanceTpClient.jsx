"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";

// Rendered client-side only: this page reads sessionStorage/localStorage (booking details, auth)
// while rendering, which does not exist on the server during `next build` prerendering.
export default dynamic(() => import("@/views/AmbulanceTp"), {
  ssr: false,
  loading: () => <PageLoader />,
});
