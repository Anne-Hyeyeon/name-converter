"use client";

import Script from "next/script";

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
 return (
  <Script
   src="https://storage.adrop.io/js/adrop-0.1.2.min.js"
   strategy="lazyOnload"
   onLoad={() => {
    console.log("Adrop script loaded successfully");
    window.adrop = window.adrop || {};
    window.adrop.initialize("ADROP_APP_KEY");
   }}
   onError={(e) => {
    console.error("Error loading Adrop script", e);
   }}
  />
 );
}
