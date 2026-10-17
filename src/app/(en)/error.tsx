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
        <p className={styles.infoText}>Oops, something went wrong. 😢</p>
        <p className={styles.infoText}>Please try again in a moment.</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
}
