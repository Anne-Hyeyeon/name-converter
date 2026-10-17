import type { Metadata } from "next";
import { getDictionary } from "./i18n";
import styles from "./korean-name.module.css";
import BackButton from "./components/BackButton";

const t = getDictionary();

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  keywords: t.meta.keywords,
  openGraph: {
    title: t.meta.title,
    description: t.meta.description,
    type: "website",
    siteName: t.siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.title,
    description: t.meta.description,
  },
};

export default function KoreanNameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.localeRoot}>
      <BackButton />
      {children}
    </div>
  );
}
