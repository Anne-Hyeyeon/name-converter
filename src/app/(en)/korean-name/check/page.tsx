import type { Metadata } from "next";
import Link from "next/link";
import searchStyles from "@/app/(shared)/components/search/SearchComponent.module.css";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import KoreanNameCheckForm from "../components/KoreanNameCheckForm";
import { romanizeName, romanizeSlug } from "../utils/romanize";

const t = getDictionary();

const EXAMPLES = ["지민", "서연", "영자", "지훈", "민준", "춘자"];

export const metadata: Metadata = {
  title: `${t.check.title} - ${t.siteName}`,
  description: t.check.lede,
  alternates: { canonical: KOREAN_NAME_URLS.CHECK },
};

export default function KoreanNameCheckPage() {
  return (
    <div className={searchStyles.container}>
      <h1 className={searchStyles.title}>{t.check.title}</h1>
      <p className={searchStyles.infoText}>{t.check.lede}</p>
      <KoreanNameCheckForm />
      {EXAMPLES.map((name) => (
        <Link
          key={name}
          href={KOREAN_NAME_URLS.check(romanizeSlug(name))}
          className={searchStyles.updateNoteLink}
        >
          {romanizeName(name)} (<span lang="ko">{name}</span>)
        </Link>
      ))}
    </div>
  );
}
