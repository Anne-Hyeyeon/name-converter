import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내가 앤이라니",
  description:
    "당신의 성별, 세대, 성격에 맞는 완벽한 영어 이름을 춘자가 추천해드립니다. 개성있고 트렌디한 영어 이름을 찾아보세요!",
  keywords:
    "영어이름추천, 영어이름생성기, 개성있는영어이름, 트렌디한영어이름, 성격별영어이름, 세대별영어이름, 내가 앤이라니",
  openGraph: {
    title: "내가 앤이라니",
    description:
      "당신한테 딱 맞는 영어 이름은 무엇일까요? 설마 앤? 영어 이름을 추천해 드립니다!",
    type: "website",
    siteName: "내가 앤이라니",
    images: [
      {
        url: "/amI-english-name.jpg",
        width: 1200,
        height: 630,
        alt: "춘자의 영어 이름 추천 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "내가 앤이라니",
    description:
      "당신한테 딱 맞는 영어 이름은 무엇일까요? 설마 앤? 영어 이름을 추천해 드립니다!",
    images: ["/amI-english-name.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function YourEnglishNameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
