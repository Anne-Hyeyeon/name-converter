import { redirect } from "next/navigation";
import EnglishNameResult from "@/app/(shared)/components/english-name/EnglishNameResult";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import styles from "@/app/result/[name]/page.module.css";
import { Gender } from "@/app/(shared)/constants/recommendOptions";
import { getPersonalizedComment } from "@/app/(shared)/constants";
import type { Metadata } from "next";

type SearchParams = { [key: string]: string | string[] | undefined };

const parseRecommendParams = (searchParams: SearchParams) => {
  const genderRaw = searchParams.gender;
  const gender: Gender | null =
    genderRaw === "male" || genderRaw === "female" ? genderRaw : null;
  const generation = parseInt(searchParams.generation as string);
  const characteristics =
    (searchParams.characteristics as string)
      ?.split(",")
      ?.map((num) => parseInt(num))
      ?.filter((num) => !isNaN(num)) || [];
  const koreanName = ((searchParams.koreanName as string) || "").trim();

  if (
    gender === null ||
    isNaN(generation) ||
    characteristics.length === 0 ||
    koreanName.length === 0
  ) {
    return null;
  }

  return { gender, generation, characteristics, koreanName };
};

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const siteName = "내가 앤이라니";
  const title = `${params.name} - ${siteName}`;
  const description = `${params.name}은 당신에게 추천하는 영어 이름입니다.`;

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

export default async function RecommendPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: SearchParams;
}) {
  const allNameData = await getAllNameData();
  const selectedNameData = allNameData.find(
    (data) => data.name === params.name
  );
  const recommendParams = parseRecommendParams(searchParams);

  if (!selectedNameData || !recommendParams) {
    redirect(`/result/${encodeURIComponent(params.name)}`);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <EnglishNameResult
          result={selectedNameData}
          selectedCharacteristics={recommendParams.characteristics}
          selectedGender={recommendParams.gender}
          selectedGeneration={recommendParams.generation}
          koreanName={recommendParams.koreanName}
          personalizedComment={getPersonalizedComment(
            recommendParams.characteristics
          )}
        />
      </div>
    </div>
  );
}
