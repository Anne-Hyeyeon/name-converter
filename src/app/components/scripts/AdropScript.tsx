"use client";

import Script from "next/script";
import { useEffect } from "react";

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
 useEffect(() => {
  const initializeAdrop = () => {
   if (window.adrop && typeof window.adrop.initialize === "function") {
    window.adrop.initialize(`${process.env.NEXT_PUBLIC_ADROP_APP_KEY}`);
    console.log("Adrop initialized successfully");
   } else {
    console.error("Adrop initialize function not found");
   }
  };

  if (
   document.querySelector(
    'script[src="https://storage.adrop.io/js/adrop-0.1.2.min.js"]'
   )
  ) {
   initializeAdrop();
  } else {
   window.addEventListener("adrop-loaded", initializeAdrop);
  }

  return () => {
   window.removeEventListener("adrop-loaded", initializeAdrop);
  };
 }, []);

 return (
  <>
   <Script
    id="adrop-main"
    src="https://storage.adrop.io/js/adrop-0.1.2.min.js"
    onLoad={() => {
     console.log("Adrop script loaded successfully");
     window.dispatchEvent(new Event("adrop-loaded"));
    }}
    onError={(e) => {
     console.error("Error loading Adrop script", e);
    }}
   />
  </>
 );
}
