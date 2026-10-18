"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";

const t = getDictionary();

export default function BackButton({ className }: { className: string }) {
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
    <button
      type="button"
      className={className}
      onClick={goBack}
      aria-label={t.header.back}
      title={t.header.back}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M15 5l-7 7 7 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
