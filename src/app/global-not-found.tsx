import type { Metadata } from "next";
import Header from "./(shared)/components/layout/Header";
import Footer from "./(shared)/components/layout/Footer";
import PageNotFound from "./(shared)/components/search/PageNotFound";
import GoogleAnalyticsScript from "./(shared)/components/scripts/GoogleAnalyticsScript";
import "./(shared)/styles/globals.css";
import styles from "./(shared)/styles/layout.module.css";
import { URLS } from "./(shared)/constants/urls";

export const metadata: Metadata = {
  metadataBase: new URL(URLS.SITE),
  title: "페이지를 찾을 수 없어요 - 내가 춘자라니",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <head>
        <GoogleAnalyticsScript />
      </head>
      <body className={styles.body}>
        <Header />
        <main className={styles.main}>
          <PageNotFound locale="ko" />
        </main>
        <Footer locale="ko" />
      </body>
    </html>
  );
}
