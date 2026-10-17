"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import styles from "../korean-name.module.css";

const t = getDictionary();

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const firstPath = useRef(pathname);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (pathname !== firstPath.current) hasMoved.current = true;
  }, [pathname]);

  if (pathname === KOREAN_NAME_URLS.HOME) return null;

  const goBack = () => {
    if (hasMoved.current) {
      router.back();
    } else {
      router.push(KOREAN_NAME_URLS.HOME);
    }
  };

  return (
    <div className={styles.backBar}>
      <button type="button" className={styles.backButton} onClick={goBack}>
        {t.header.back}
      </button>
    </div>
  );
}
