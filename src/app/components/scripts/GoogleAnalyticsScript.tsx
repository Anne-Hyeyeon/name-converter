import Script from "next/script";
import React from "react";

export default function GoogleAnalyticsScript() {
 return (
  <>
   <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-M1E6F65P9K"
    strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
    {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-M1E6F65P9K');
       `}
   </Script>
  </>
 );
}
