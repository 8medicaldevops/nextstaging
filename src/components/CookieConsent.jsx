"use client";

import { useEffect, useState } from "react";
import { initializeAnalytics } from "@/lib/analytics";

export default function CookieConsent() {
  // Rendered visible from the server so it paints with the first frame. For visitors who already
  // answered, the inline script in the layout hides it (html.consented) before that first paint.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let consent = null;
    try {
      consent = localStorage.getItem("cookieConsent");
    } catch (e) {
      return;
    }
    if (consent === "accepted") initializeAnalytics();
    if (consent === "accepted" || consent === "rejected") setVisible(false);
  }, []);

  const decide = (choice) => {
    try {
      localStorage.setItem("cookieConsent", choice);
    } catch (e) {
      /* storage unavailable */
    }
    if (choice === "accepted") initializeAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-consent"
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-pop sm:p-5 md:flex-row md:items-center"
    >
      <p className="flex-1 text-sm leading-relaxed text-zinc-600">
        We use cookies to enhance your experience. By continuing to visit this
        site, you agree to our use of cookies.
      </p>
      <div className="flex gap-2 md:shrink-0">
        <button
          onClick={() => decide("rejected")}
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-brmedium text-zinc-700 transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Reject
        </button>
        <button
          onClick={() => decide("accepted")}
          className="flex-1 rounded-lg bg-ev-700 px-4 py-2 text-sm font-brmedium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
