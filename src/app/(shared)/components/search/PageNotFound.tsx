import Link from "next/link";
import styles from "./NameNotFound.module.css";
import { URLS } from "../../constants/urls";
import { KOREAN_NAME_URLS } from "@/app/(en)/korean-name/constants";

const TEXT = {
  ko: {
    message: "페이지를 찾을 수 없어요.",
    hint: "주소가 바뀌었거나 잘못 입력된 것 같아요.",
    home: "검색창으로 돌아가기",
    homeHref: URLS.MAIN_PAGE,
  },
  en: {
    message: "We couldn't find that page.",
    hint: "The link may be old or mistyped.",
    home: "Find my Korean name",
    homeHref: KOREAN_NAME_URLS.HOME,
  },
} as const;

export default function PageNotFound({ locale }: { locale: "ko" | "en" }) {
  const text = TEXT[locale];
  return (
    <div>
      <div className={styles.resultPage}>
        <h1 className={styles.name}>404</h1>
        <div className={styles.emojiContainer}>
          <span aria-hidden="true" className={styles.largeEmoji}>
            🙈
          </span>
        </div>
        <div className={styles.mainContent}>
          <p className={styles.infoText}>{text.message}</p>
          <p className={styles.infoText}>{text.hint}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Link
          href={text.homeHref}
          className={`${styles.button} ${styles.linkButton}`}
        >
          {text.home}
        </Link>
      </div>
    </div>
  );
}
