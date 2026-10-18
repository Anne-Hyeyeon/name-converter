"use client";

import { useEffect } from "react";
import styles from "@/app/(shared)/components/search/NameNotFound.module.css";

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
        <p className={styles.infoText}>哎呀，發生了一點問題 😢</p>
        <p className={styles.infoText}>請稍後再試一次。</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={reset}>
          再試一次
        </button>
      </div>
    </div>
  );
}
