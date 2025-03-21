import Script from "next/script";
import React from "react";

export default function GoogleAdSenseScript() {
 return (
  <Script
   src="ttps://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9957097846867956"
   strategy="afterInteractive"
  />
 );
}
