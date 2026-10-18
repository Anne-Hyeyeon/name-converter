import { Metadata } from "next";
import Header from "@/app/(shared)/components/layout/Header";
import Footer from "@/app/(shared)/components/layout/Footer";
import GoogleAnalyticsScript from "@/app/(shared)/components/scripts/GoogleAnalyticsScript";
import GoogleAdSenseScript from "@/app/(shared)/components/scripts/GoogleAdSenseScript";
import "@/app/(shared)/styles/globals.css";
import styles from "@/app/(shared)/styles/layout.module.css";
import { URLS } from "@/app/(shared)/constants/urls";
import JsonLd from "@/app/(shared)/components/seo/JsonLd";
import { websiteJsonLd } from "@/app/(shared)/utils/structuredData";
import { zh } from "./zh-tw/i18n";
import { ZH_URLS } from "./zh-tw/constants";

export const metadata: Metadata = {
  metadataBase: new URL(URLS.SITE),
  title: zh.meta.title,
  description: zh.meta.description,
  keywords: zh.meta.keywords,
  openGraph: {
    title: zh.meta.title,
    description: zh.meta.description,
    type: "website",
    siteName: zh.siteName,
    locale: "zh_TW",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function ChineseRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={zh.htmlLang}>
      <head>
        <GoogleAnalyticsScript />
        <GoogleAdSenseScript />
      </head>
      <body className={styles.body}>
        <JsonLd
          data={websiteJsonLd({
            name: zh.siteName,
            alternateName: "내가 춘자라니",
            path: ZH_URLS.HOME,
            language: zh.htmlLang,
            description: zh.meta.description,
          })}
        />
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer locale="zh" />
      </body>
    </html>
  );
}
