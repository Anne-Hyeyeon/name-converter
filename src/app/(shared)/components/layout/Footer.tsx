import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { URLS } from "../../constants/urls";
import { KOREAN_NAME_URLS } from "@/app/(en)/korean-name/constants";
import { ZH_URLS } from "@/app/(zh)/zh-tw/constants";

const LINKS = {
  ko: {
    label: "사이트 메뉴",
    items: [
      { href: URLS.MAIN_PAGE, label: "내가 춘자라니" },
      { href: URLS.ENGLISH_NAME_PAGE, label: "내가 앤이라니" },
      { href: URLS.TOP100_2025_PAGE, label: "2025 미국 아기이름 Top 100" },
      { href: URLS.YEAR_PAGE, label: "태어난 해 미국 인기 이름" },
    ],
    switchLabel: "English",
    switchHref: KOREAN_NAME_URLS.HOME,
    switchLang: "en",
  },
  en: {
    label: "Site menu",
    items: [
      { href: KOREAN_NAME_URLS.HOME, label: "My Korean name" },
      { href: KOREAN_NAME_URLS.BORN, label: "Korean names by birth year" },
      { href: KOREAN_NAME_URLS.CHECK, label: "My bias's name" },
    ],
    switchLabel: "한국어",
    switchHref: URLS.MAIN_PAGE,
    switchLang: "ko",
  },
  zh: {
    label: "網站選單",
    items: [{ href: ZH_URLS.HOME, label: "原來我是淑芬？！英文名字年代查詢" }],
    switchLabel: "한국어",
    switchHref: URLS.MAIN_PAGE,
    switchLang: "ko",
  },
} as const;

const Footer = ({ locale }: { locale: "ko" | "en" | "zh" }) => {
  const links = LINKS[locale];
  return (
    <footer className={styles.footer}>
      <nav aria-label={links.label} className={styles.nav}>
        {links.items.map((item) => (
          <Link key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </Link>
        ))}
      </nav>
      <p className={styles.language}>
        <Link
          href={links.switchHref}
          hrefLang={links.switchLang}
          lang={links.switchLang}
          className={styles.link}
        >
          🌏 {links.switchLabel}
        </Link>
      </p>
      <p>© {new Date().getFullYear()} Anne-Hyeyeon. All rights reserved.</p>
      <p>dlswptkfkd@gmail.com</p>
    </footer>
  );
};

export default Footer;
