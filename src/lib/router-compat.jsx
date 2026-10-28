"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useMemo } from "react";

// Drop-in replacement for the react-router-dom APIs this codebase uses,
// backed by the Next.js App Router.

export const Link = forwardRef(function Link({ to, href, ...props }, ref) {
  return <NextLink ref={ref} href={to ?? href ?? "/"} {...props} />;
});

export function useNavigate() {
  const router = useRouter();
  return useMemo(() => {
    return function navigate(to, options) {
      if (typeof to === "number") {
        if (to < 0) router.back();
        else router.forward();
        return;
      }
      if (options && options.replace) router.replace(to);
      else router.push(to);
    };
  }, [router]);
}
