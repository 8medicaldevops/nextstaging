"use client";

export default function PageLoader() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-ev-700" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
