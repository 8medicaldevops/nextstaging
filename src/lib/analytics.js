// Analytics loaders, ported from the former index.html inline script.
// Only ever called client-side, after the user accepts cookies.

import ReactGA from "react-ga4";
import { clarity } from "react-microsoft-clarity";

let loaded = false;

function loadClarityTag() {
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "nvzzh836vv");
}

function loadGoogleAnalytics() {
  const gaScript = document.createElement("script");
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-23C8DJ5T38";
  gaScript.async = true;
  document.head.appendChild(gaScript);

  gaScript.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-B4NTDXR73Q");
  };
}

function loadGoogleTagManager() {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l !== "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-PL59LTKG");
}

function loadTawkChat() {
  (function () {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/67b09d47d56a6c191666adb7/1ik4uco20";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
}

export function initializeAnalytics() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  loadClarityTag();
  loadGoogleAnalytics();
  loadGoogleTagManager();
  loadTawkChat();

  if (process.env.NODE_ENV === "production") {
    try {
      clarity.init("nvd25h7exz");
    } catch (e) {
      /* non-fatal */
    }
    ReactGA.initialize("G-23C8DJ5T38");
  }
}
