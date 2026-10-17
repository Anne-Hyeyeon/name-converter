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

const DESCRIPTION =
  "Anne이 미국에선 춘자라고? 내가 춘자라니! 내 영어 이름이 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보기! 이름의 유행 연도도 알 수 있어요ㅎㅎ";

export const metadata: Metadata = {
  metadataBase: new URL(URLS.SITE),
  title: "내가 춘자라니",
  description:
    "Anne이 미국에선 춘자라고? 내가 춘자라니! 내 영어 이름이 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보기! 이름의 유행 연도도 알 수 있어요ㅎㅎ",
  keywords:
    "영어이름, 촌스러운영어이름, 트렌디한영어이름, 영어이름추천, 영어이름생성기, 내가 춘자라니, 영어이름추천, 트렌디한영어이름",
  openGraph: {
    title: "내가 춘자라니",
    description:
      "Anne이 미국에선 춘자라고? 내가 춘자라니! 내 영어 이름이 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보기! 이름의 유행 연도도 알 수 있어요ㅎㅎ",
    type: "website",
    siteName: "내가 춘자라니",
    locale: "ko_KR",
    images: [
      {
        url: "/amI.png",
        width: 1200,
        height: 630,
        alt: "춘자의 이름 변환기 - 내 영어 이름은 촌스러울까?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "내가 춘자라니",
    description:
      "Anne이 미국에선 춘자라고? 내가 춘자라니! 내 영어 이름이 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보기! 이름의 유행 연도도 알 수 있어요ㅎㅎ",
    images: ["/amI.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <GoogleAnalyticsScript />
        <GoogleAdSenseScript />
      </head>
      <body className={styles.body}>
        <JsonLd
          data={websiteJsonLd({
            name: "내가 춘자라니",
            alternateName: "Am I Chunja?!",
            path: URLS.MAIN_PAGE,
            language: "ko",
            description: DESCRIPTION,
          })}
        />
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer locale="ko" />
      </body>
    </html>
  );
}
