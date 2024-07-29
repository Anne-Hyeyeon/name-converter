import { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import Footer from "./components/Footer";
import CoupangBanner from "./components/CoopangBanner";

export const metadata: Metadata = {
 title: "내가 춘자라니",
 description:
  "Anne이 미국에선 춘자라고? 내가 춘자라니! 내 영어 이름이 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보기! 이름의 유행 연도도 알 수 있어요ㅎㅎ",
 openGraph: {
  type: "website",
  url: "https://chunja.vercel.app",
  title: "내가 춘자라니",
  description:
   "Anne이 미국에선 춘자라고? 내가 춘자라니! 내 영어 이름이 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보기! 이름의 유행 연도도 알 수 있어요ㅎㅎ",
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
    <main className={styles.main}>
     {children}{" "}
     <div className={styles.banner}>
      <CoupangBanner />
     </div>
    </main>

    <Footer />
   </body>
  </html>
 );
}
