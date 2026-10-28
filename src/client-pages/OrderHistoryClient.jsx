"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";

// Rendered client-side only: this page depends on browser state (localStorage,
// auth tokens, booking data) during render.
export default dynamic(() => import("@/views/OrderHistory"), {
  ssr: false,
  loading: () => <PageLoader />,
});
