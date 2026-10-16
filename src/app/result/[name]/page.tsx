import SearchResult from "@/app/(shared)/components/search/SearchResult";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import styles from "./page.module.css";
import NameNotFound from "@/app/(shared)/components/search/NameNotFound";
import type { Metadata } from "next";
import { findName, findSimilarNames } from "@/app/(shared)/utils/findName";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const selectedNameData = findName(await getAllNameData(), name);

  const siteName = "내가 춘자라니";

  if (!selectedNameData) {
    return {
      title: `${name} - ${siteName}`,
      description: `${name}에 대한 결과를 찾을 수 없습니다.`,
      robots: { index: false, follow: true },
    };
  }

  const title = `${selectedNameData.name} - ${siteName}`;
  const description = `${selectedNameData.name}은 미국에서 어떤 이미지의 이름일까요? 이름의 트렌드와 특성을 알아보세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/result/${selectedNameData.name}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName,
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const allNameData = await getAllNameData();
  const selectedNameData = findName(allNameData, name);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {selectedNameData ? (
          <SearchResult result={selectedNameData} />
        ) : (
          <NameNotFound
            name={name}
            similarNames={findSimilarNames(allNameData, name)}
          />
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const allNameData = await getAllNameData();

  return allNameData.map((data) => ({
    name: data.name,
  }));
}
