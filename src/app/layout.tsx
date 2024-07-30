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
   <head>
    {/* Google Tag Manager */}
    <script
     dangerouslySetInnerHTML={{
      __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WJ4RGKP8');
            `,
     }}
    />
    {/* End Google Tag Manager */}
   </head>
   <body className={styles.body}>
    {/* Google Tag Manager (noscript) */}
    <noscript>
     <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-WJ4RGKP8"
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
     />
    </noscript>
    {/* End Google Tag Manager (noscript) */}
    <main className={styles.main}>{children} </main>
    <Footer />
    <div className={styles.banner}>
     <CoupangBanner />
    </div>
   </body>
  </html>
 );
}
