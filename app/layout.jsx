import "@/index.css";
import ReactDOM from "react-dom";
import Providers from "@/components/Providers";
import CookieConsent from "@/components/CookieConsent";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT } from "@/lib/site";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2C0174",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "8medical — Emergency Medical Response & Ambulance Services in Nigeria",
    template: "%s | 8medical",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "ambulance Nigeria",
    "emergency medical response",
    "ambulance standby",
    "medical transport",
    "urgent care Lagos",
    "event medical cover",
    "8medical",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "8medical — Emergency Medical Response & Ambulance Services",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 590, height: 361, alt: "8medical ambulance" }],
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    site: "@8medicalng",
    title: "8medical — Emergency Medical Response & Ambulance Services",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Eight Medical Ltd",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      telephone: CONTACT.phone,
      sameAs: CONTACT.socials,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT.phone,
          contactType: "emergency",
          areaServed: "NG",
          availableLanguage: "en",
        },
      ],
    },
    {
      "@type": "EmergencyService",
      "@id": `${SITE_URL}/#emergencyservice`,
      name: "8medical Emergency Medical Response",
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      telephone: CONTACT.phone,
      areaServed: { "@type": "Country", name: "Nigeria" },
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      availableService: [
        { "@type": "MedicalProcedure", name: "Emergency Response" },
        { "@type": "MedicalProcedure", name: "Air & Ground Ambulance Transport" },
        { "@type": "MedicalProcedure", name: "Ambulance Standby for Events" },
        { "@type": "MedicalProcedure", name: "Urgent Care" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

const FONT_WEIGHTS = ["300", "400", "500", "600", "700"];

export default function RootLayout({ children }) {
  FONT_WEIGHTS.forEach((w) => {
    ReactDOM.preload?.(`/fonts/figtree/figtree-${w}.woff2`, {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  });

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
