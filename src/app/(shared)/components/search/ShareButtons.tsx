"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { NameData } from "../../types";
import { URLS } from "../../constants/urls";
import { KAKAO } from "../../constants/kakao";
import { trackEvent } from "../../utils/trackEvent";
import styles from "./SearchResult.module.css";

interface KakaoFeedLink {
  mobileWebUrl: string;
  webUrl: string;
}

interface KakaoSdk {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share: {
    sendDefault: (settings: {
      objectType: "feed";
      content: {
        title: string;
        description: string;
        imageUrl: string;
        imageWidth: number;
        imageHeight: number;
        link: KakaoFeedLink;
      };
      buttons: { title: string; link: KakaoFeedLink }[];
    }) => void;
  };
}

const getKakao = () =>
  (window as unknown as { Kakao?: KakaoSdk }).Kakao ?? null;

const initKakao = () => {
  const kakao = getKakao();
  if (!kakao || !KAKAO.JS_KEY) return null;
  if (!kakao.isInitialized()) kakao.init(KAKAO.JS_KEY);
  return kakao;
};

const toLink = (url: string): KakaoFeedLink => ({
  mobileWebUrl: url,
  webUrl: url,
});

export default function ShareButtons({ result }: { result: NameData }) {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const encodedName = encodeURIComponent(result.name);
  const resultUrl = `${URLS.SITE}/result/${encodedName}`;
  const hasKoreanName =
    !!result.koreanName && Number(result.characteristic) !== 10;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(resultUrl);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
      trackEvent("share_result", { method: "copy", name: result.name });
    } catch {
      alert(`링크를 복사하지 못했어요. 주소를 직접 복사해 주세요.\n${resultUrl}`);
    }
  };

  const shareKakao = () => {
    const kakao = initKakao();
    if (!kakao) {
      copyLink();
      return;
    }
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: hasKoreanName
          ? `${result.name}, 미국에서는 ${result.koreanName}`
          : `${result.name}, 미국에서는 어떤 이름일까?`,
        description: "내 영어 이름은 미국에서 몇 년생 느낌일까? 🙉",
        imageUrl: `${URLS.SITE}/kakao-card/${encodedName}`,
        imageWidth: KAKAO.CARD_SIZE.width,
        imageHeight: KAKAO.CARD_SIZE.height,
        link: toLink(resultUrl),
      },
      buttons: [
        { title: "결과 보기", link: toLink(resultUrl) },
        { title: "나도 해보기", link: toLink(URLS.SITE) },
      ],
    });
    trackEvent("share_result", { method: "kakao", name: result.name });
  };

  return (
    <>
      {KAKAO.JS_KEY && (
        <>
          <Script
            src={KAKAO.SDK_URL}
            integrity={KAKAO.SDK_INTEGRITY}
            crossOrigin="anonymous"
            strategy="afterInteractive"
            onLoad={initKakao}
          />
          <button
            className={`${styles.button} ${styles.kakaoButton}`}
            onClick={shareKakao}
          >
            카카오톡으로 공유하기
          </button>
        </>
      )}
      <button
        className={`${styles.button} ${styles.copyButton}`}
        onClick={copyLink}
      >
        {copied ? "링크를 복사했어요 ✓" : "링크 복사하기"}
      </button>
    </>
  );
}
