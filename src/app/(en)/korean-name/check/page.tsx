import type { Metadata } from "next";
import searchStyles from "@/app/(shared)/components/search/SearchComponent.module.css";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import KoreanNameCheckForm from "../components/KoreanNameCheckForm";
import { romanizeName, romanizeSlug } from "../utils/romanize";
import RelatedNames from "@/app/(shared)/components/seo/RelatedNames";
import localStyles from "../korean-name.module.css";

const t = getDictionary();

const EXAMPLES = ["지민", "정국", "태형", "지수", "제니", "채영", "민정", "원영"];

export const metadata: Metadata = {
  title: `${t.check.title} - ${t.siteName}`,
  description: t.check.lede.join(" "),
  alternates: { canonical: KOREAN_NAME_URLS.CHECK },
};

export default function KoreanNameCheckPage() {
  return (
    <div className={searchStyles.container}>
      <h1 className={searchStyles.title}>{t.check.title}</h1>
      <p className={localStyles.lede}>
        {t.check.lede.map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
      <KoreanNameCheckForm />
      <RelatedNames
        title={t.check.examplesTitle}
        names={EXAMPLES.map((name) => ({
          href: KOREAN_NAME_URLS.check(romanizeSlug(name)),
          label: romanizeName(name),
          sub: name,
        }))}
      />
    </div>
  );
}
