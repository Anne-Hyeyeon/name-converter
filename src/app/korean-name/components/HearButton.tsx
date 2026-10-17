"use client";

import { useSyncExternalStore } from "react";
import { trackEvent } from "@/app/(shared)/utils";
import { getDictionary } from "../i18n";
import styles from "../korean-name.module.css";

const t = getDictionary();

const subscribe = () => () => {};
const canSpeak = () => "speechSynthesis" in window;

export default function HearButton({ hangul }: { hangul: string }) {
  const supported = useSyncExternalStore(subscribe, canSpeak, () => false);
  if (!supported) return null;

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(hangul);
    utterance.lang = "ko-KR";
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    trackEvent("korean_name_hear", { korean_name: hangul });
  };

  return (
    <button type="button" className={styles.hearButton} onClick={speak}>
      {t.result.hear}
    </button>
  );
}
