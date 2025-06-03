"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { NameData } from "../../types";
import NameRecommendSelector from "./NameRecommendSelector";
import styles from "./EnglishNameComponent.module.css";

interface EnglishNameComponentProps {
  allNameData: NameData[];
}

export default function EnglishNameComponent({
  allNameData,
}: EnglishNameComponentProps) {
  const [showRecommendSelector, setShowRecommendSelector] = useState(false);
  const router = useRouter();

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
              layout="responsive"
              width={250}
              height={250}
              className={styles.image}
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
          <NameRecommendSelector allNameData={allNameData} />
          <button
            className={styles.backButton}
            onClick={() => setShowRecommendSelector(false)}
          >
            뒤로 가기
          </button>
        </>
      )}

      {!showRecommendSelector && (
        <div className={styles.updateNoteLink} onClick={() => router.push("/")}>
          내가 춘자라니&rsquo; 메인으로 돌아가기
        </div>
      )}
    </div>
  );
}
