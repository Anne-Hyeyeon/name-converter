"use client";

import { useEffect, useRef, useState } from "react";
import { URLS } from "@/app/(shared)/constants/urls";
import { trackEvent } from "@/app/(shared)/utils";
import styles from "../korean-name.module.css";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";

const t = getDictionary();

export default function KoreanShareButtons({
  name,
  shareText,
  onSave,
}: {
  name: string;
  shareText: string | null;
  onSave: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const url = `${URLS.SITE}${KOREAN_NAME_URLS.result(name)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
      trackEvent("korean_name_share", { method: "copy", name });
    } catch {
      alert(t.result.copyFailed(url));
    }
  };

  const share = async () => {
    if (!navigator.share) {
      copyLink();
      return;
    }
    try {
      await navigator.share({
        title: t.siteName,
        text: shareText ?? t.meta.description,
        url,
      });
      trackEvent("korean_name_share", { method: "native", name });
    } catch {
      return;
    }
  };

  return (
    <>
      <button type="button" className={styles.primaryAction} onClick={share}>
        {t.result.share}
      </button>
      <div className={styles.secondaryActions}>
        <button type="button" className={styles.secondaryAction} onClick={copyLink}>
          {copied ? t.result.copied : t.result.copy}
        </button>
        <button type="button" className={styles.secondaryAction} onClick={onSave}>
          {t.result.save}
        </button>
      </div>
    </>
  );
}
