"use client";

import { useEffect } from "react";
import styles from "./(shared)/components/search/NameNotFound.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div>
      <div className={styles.resultPage}>
        <p className={styles.infoText}>앗, 문제가 생겼어요. 😢</p>
        <p className={styles.infoText}>잠시 후 다시 시도해 주세요.</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={reset}>
          다시 시도하기
        </button>
      </div>
    </div>
  );
}
