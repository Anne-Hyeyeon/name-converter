import SearchResult from "@/app/(shared)/components/search/SearchResult";
import EnglishNameResult from "@/app/(shared)/components/english-name/EnglishNameResult";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import styles from "./page.module.css";
import NameNotFound from "@/app/(shared)/components/search/NameNotFound";

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
    const gender = searchParams.gender as "male" | "female";
    const generation = parseInt(searchParams.generation as string);
    const characteristics =
      (searchParams.characteristics as string)
        ?.split(",")
        ?.map((num) => parseInt(num))
        ?.filter((num) => !isNaN(num)) || [];
    const koreanName = (searchParams.koreanName as string) || "";

    return (
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <EnglishNameResult
            result={selectedNameData}
            selectedCharacteristics={characteristics}
            selectedGender={gender}
            selectedGeneration={generation}
            koreanName={koreanName}
            allNameData={allNameData}
          />
        </div>
      </div>
    );
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
