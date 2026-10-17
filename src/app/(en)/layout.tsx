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
import { getDictionary } from "./korean-name/i18n";
import { KOREAN_NAME_URLS } from "./korean-name/constants";

const t = getDictionary();

export const metadata: Metadata = {
  metadataBase: new URL(URLS.SITE),
  title: t.meta.title,
  description: t.meta.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={t.htmlLang}>
      <head>
        <GoogleAnalyticsScript />
        <GoogleAdSenseScript />
      </head>
      <body className={styles.body}>
        <JsonLd
          data={websiteJsonLd({
            name: t.siteName,
            alternateName: "내가 춘자라니",
            path: KOREAN_NAME_URLS.HOME,
            language: t.htmlLang,
            description: t.meta.description,
          })}
        />
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer locale="en" />
      </body>
    </html>
  );
}
