"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface Consent {
  adConsentGranted?: boolean;
  adUserDataConsentGranted?: boolean;
  adPersonalizationConsentGranted?: boolean;
  analyticsConsentGranted?: boolean;
  functionalityConsentGranted?: boolean;
  personalizationConsentGranted?: boolean;
  securityConsentGranted?: boolean;
}

export type InitUserConsentCallback = (consent?: Consent) => void;

declare global {
  interface Window {
    postUserConsent(consent: Consent): void;
    addInitUserConsentListener(callback: InitUserConsentCallback): void;
  }
}

export const ConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addInitUserConsentListener((consent) => {
      console.log("InitConsent", consent);
      if (!consent?.analyticsConsentGranted) {
        setIsVisible(true);
      }
    });
  }, []);

  const handleClose = () => {
    window.postUserConsent({ analyticsConsentGranted: true });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-300 p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-black">
          Este site utiliza &quot;Cookies&quot; para melhorar a sua experiência.{" "}
          <Link href="/privacidade" className="underline">
            Saiba mais
          </Link>
          .
        </p>
        <button
          onClick={handleClose}
          className="bg-black text-white px-4 py-2 rounded font-medium whitespace-nowrap hover:bg-gray-800"
        >
          FECHAR
        </button>
      </div>
    </div>
  );
};
