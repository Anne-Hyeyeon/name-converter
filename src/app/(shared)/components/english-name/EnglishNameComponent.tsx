"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import NameRecommendSelector from "./NameRecommendSelector";
import styles from "./EnglishNameComponent.module.css";
import { URLS } from "../../constants/urls";

interface EnglishNameComponentProps {
  availableCombos: string[];
}

export default function EnglishNameComponent({
  availableCombos,
}: EnglishNameComponentProps) {
  const [showRecommendSelector, setShowRecommendSelector] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>나에게 딱 맞는 영어 이름은? 👩</h1>

      <div
        className={`${styles.infoContainer} ${
          showRecommendSelector && styles.hidden
        }`}
      >
        <div className={styles.imageWrapper}>
          <a
            href="https://buymeacoffee.com/annehyeyeon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/amI-english-name.jpg"
              alt="메인 이미지"
              width={250}
              height={250}
              sizes="(max-width: 480px) 60vw, 250px"
              style={{ width: "100%", height: "auto" }}
              className={styles.image}
              priority
            />
          </a>
        </div>
        <p className={styles.infoText}>
          <strong>개발자 이직 성공 기념 </strong>
          <strong className={styles.secondLine}>
            영어 이름 추천 서비스 오-픈 🕺
          </strong>
        </p>
      </div>

      {!showRecommendSelector && (
        <button
          className={styles.startButton}
          onClick={() => setShowRecommendSelector(true)}
        >
          이름 추천 시작하기 ✨
        </button>
      )}

      {showRecommendSelector && (
        <>
          <NameRecommendSelector availableCombos={availableCombos} />
          <button
            className={styles.backButton}
            onClick={() => setShowRecommendSelector(false)}
          >
            뒤로 가기
          </button>
        </>
      )}

      {!showRecommendSelector && (
        <Link href={URLS.MAIN_PAGE} className={styles.updateNoteLink}>
          &lsquo;내가 춘자라니&rsquo; 메인으로 돌아가기
        </Link>
      )}
    </div>
  );
}
