"use client";

import { useEffect, useRef, useState } from "react";
import { URLS } from "@/app/(shared)/constants/urls";
import { trackEvent } from "@/app/(shared)/utils";
import { zh } from "../i18n";
import { ZH_URLS } from "../constants";
import styles from "../zh.module.css";

export default function ZhShareButtons({
  name,
  shareText,
}: {
  name: string;
  shareText: string | null;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const url = `${URLS.SITE}${ZH_URLS.result(name)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
      trackEvent("zh_name_share", { method: "copy", name });
    } catch {
      alert(zh.result.copyFailed(url));
    }
  };

  const share = async () => {
    if (!navigator.share) {
      copyLink();
      return;
    }
    try {
      await navigator.share({ title: zh.siteName, text: shareText ?? zh.meta.description, url });
      trackEvent("zh_name_share", { method: "native", name });
    } catch {
      return;
    }
  };

  return (
    <>
      <button type="button" className={styles.primaryAction} onClick={share}>
        {zh.result.share}
      </button>
      <button type="button" className={styles.secondaryAction} onClick={copyLink}>
        {copied ? zh.result.copied : zh.result.copy}
      </button>
    </>
  );
}
