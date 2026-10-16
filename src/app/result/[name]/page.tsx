import SearchResult from "@/app/(shared)/components/search/SearchResult";
import EnglishNameResult from "@/app/(shared)/components/english-name/EnglishNameResult";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import styles from "./page.module.css";
import NameNotFound from "@/app/(shared)/components/search/NameNotFound";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const allNameData = await getAllNameData();
  const selectedNameData = allNameData.find(
    (data) => data.name === params.name
  );

  const isFromRecommendation = searchParams.from === "recommendation";
  const siteName = isFromRecommendation ? "내가 앤이라니" : "내가 춘자라니";

  if (!selectedNameData) {
    return {
      title: `${params.name} - ${siteName}`,
      description: `${params.name}에 대한 결과를 찾을 수 없습니다.`,
    };
  }

  const title = `${selectedNameData.name} - ${siteName}`;
  const description = isFromRecommendation
    ? `${selectedNameData.name}은 당신에게 추천하는 영어 이름입니다.`
    : `${selectedNameData.name}은 미국에서 어떤 이미지의 이름일까요? 이름의 트렌드와 특성을 알아보세요.`;

  return {
    title,
    description,
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
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const allNameData = await getAllNameData();
  const selectedNameData = allNameData.find(
    (data) => data.name === params.name
  );

  const isFromRecommendation = searchParams.from === "recommendation";

  if (!selectedNameData) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <NameNotFound name={params.name} />
        </div>
      </div>
    );
  }

  // 추천에서 온 경우 추천 결과 컴포넌트 렌더링
  if (isFromRecommendation) {
    const genderRaw = searchParams.gender as string | undefined;
    const gender =
      genderRaw === "male" || genderRaw === "female" ? genderRaw : null;
    const generation = parseInt(searchParams.generation as string);
    const characteristics =
      (searchParams.characteristics as string)
        ?.split(",")
        ?.map((num) => parseInt(num))
        ?.filter((num) => !isNaN(num)) || [];
    const koreanName = ((searchParams.koreanName as string) || "").trim();

    const hasValidRecommendationParams =
      gender !== null &&
      !isNaN(generation) &&
      characteristics.length > 0 &&
      koreanName.length > 0;

    if (hasValidRecommendationParams) {
      return (
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            <EnglishNameResult
              result={selectedNameData}
              selectedCharacteristics={characteristics}
              selectedGender={gender}
              selectedGeneration={generation}
              koreanName={koreanName}
            />
          </div>
        </div>
      );
    }
    // 파라미터가 비어 있거나 손상된 경우엔 일반 검색 결과로 fallback
  }

  // 일반 검색에서 온 경우 기존 검색 결과 컴포넌트 렌더링
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <SearchResult result={selectedNameData} />
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
