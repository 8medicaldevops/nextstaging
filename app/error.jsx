"use client";

import { Link } from "@/lib/router-compat";

export default function Error({ reset }) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="font-brbold text-3xl text-zinc-900">Something went wrong</h1>
      <p className="max-w-md text-zinc-600">
        An unexpected error occurred. Please try again — if you need urgent help,
        call us directly.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-ev-700 px-5 py-2.5 font-brmedium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Try again
        </button>
        <Link
          to="/"
          className="rounded-lg border border-zinc-300 px-5 py-2.5 font-brmedium text-zinc-700 transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
