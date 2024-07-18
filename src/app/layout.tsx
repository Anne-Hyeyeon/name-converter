import { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
 title: "내 이름이 춘자였다니!? 🙉",
 description:
  "Anne이 미국에선 춘자라고? 내 영어 이름이 미국에서 어떻게 받아들여지는지 확인해보세요.",
 openGraph: {
  type: "website",
  url: "https://chunja.vercel.app",
  title: "내 이름이 춘자였다니!? 🙉",
  description:
   "Anne이 미국에선 춘자라고? 내 영어 이름이 미국에서 어떻게 받아들여지는지 확인해보세요.",
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
   <body className={styles.body}>
    <main className={styles.main}>{children}</main>
    <Footer />
   </body>
  </html>
 );
}
