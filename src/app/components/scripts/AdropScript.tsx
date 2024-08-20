"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
 interface Window {
  adrop: {
   initialize: (appKey: string) => void;
   request: (
    unitId: string
   ) => Promise<{ ad: string; unit: string; message: string }>;
   setProperty: (key: string, value: string) => Promise<void>;
  };
 }
}

export default function AdropScript() {
 const [isScriptLoaded, setIsScriptLoaded] = useState(false);

 useEffect(() => {
  const initializeAdrop = () => {
   const appKey = process.env.NEXT_PUBLIC_ADROP_APP_KEY;

   if (
    window.adrop &&
    typeof window.adrop.initialize === "function" &&
    appKey
   ) {
    window.adrop.initialize(appKey);
   } else {
    console.error(
     "Failed to initialize Adrop. Please check the script and app key."
    );
   }
  };

  if (isScriptLoaded) {
   initializeAdrop();
  }
 }, [isScriptLoaded]);

 return (
  <Script
   id="adrop-main"
   src="https://storage.adrop.io/js/adrop-0.1.2.min.js"
   strategy="afterInteractive"
   onLoad={() => setIsScriptLoaded(true)}
   onError={(e) => console.error("Error loading Adrop script", e)}
  />
 );
}
