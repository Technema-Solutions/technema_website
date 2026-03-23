"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if analytics consent already exists
    const checkConsent = () => {
      const accepted = CookieConsent.acceptedCategory("analytics");
      setConsentGiven(accepted);
    };

    checkConsent();

    // Listen for consent changes
    const handleConsent = () => checkConsent();
    window.addEventListener("cc:onConsent", handleConsent);
    window.addEventListener("cc:onChange", handleConsent);

    return () => {
      window.removeEventListener("cc:onConsent", handleConsent);
      window.removeEventListener("cc:onChange", handleConsent);
    };
  }, []);

  if (!gaId || !consentGiven) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
