import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./SearchResultPage.module.css";
import GoBackButton from "@/app/components/GoBackButton";

type NameData = {
 [key: string]: string;
};

async function getName(name: string): Promise<NameData | null> {
 try {
  const res = await fetch(
   `${process.env.NEXT_PUBLIC_API_URL}/api/sheets?name=${name}`
  );
  if (!res.ok) {
   throw new Error(
    `Network response was not ok: ${res.status} ${res.statusText}`
   );
  }
  const data = await res.json();
  if (!data) {
   throw new Error("No data found");
  }
  return data;
 } catch (error) {
  console.error("Error fetching name data:", error);
  return null;
 }
}

export async function generateMetadata({
 params,
}: {
 params: { name: string };
}): Promise<Metadata> {
 const result = await getName(params.name);
 return {
  title: result ? `${result.name} - 이름 결과` : "이름 결과 없음",
  description: result
   ? `${result.name}의 미국식 이름 정보`
   : "이름 정보를 찾을 수 없습니다",
 };
}

export default async function SearchResultPage({
 params,
}: {
 params: { name: string };
}) {
 const result = await getName(params.name);

 if (!result) {
  notFound();
 }

 return (
  <div className={styles.resultPage}>
   <h1 className={styles.name}>{result.name}</h1>
   <p>
    {result.name} 이름을 가진 당신은 미국에서{" "}
    <span className={styles.koreanName}>{result.korean_name}</span> 입니다.
   </p>
   <p>
    미국에서 <span className={styles.trendYear}>{result.trend_year}</span>년도
    느낌의 이름이죠.
   </p>
   {result.male_top_100 || result.female_top_100 ? (
    <p className={styles.highlight}>
     {result.name}은(는) 미국에서 꾸준히 사랑받는 이름이에요.
    </p>
   ) : null}
   {result.trendy_female_top_100 || result.trendy_male_top_100 ? (
    <p className={styles.highlight}>
     {result.name}은 2024년도 아기 이름 TOP 100에 드는 이름이에요.
    </p>
   ) : null}
   <GoBackButton />
  </div>
 );
}
