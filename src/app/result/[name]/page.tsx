// app/result/[name]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./SearchResultPage.module.css";
import GoBackButton from "@/app/components/GoBackButton";

async function getName(name: string) {
 const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/sheets?name=${name}`
 );
 if (!res.ok) {
  return null;
 }
 return res.json();
}

export async function generateStaticParams() {
 const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/sheets?allNames=true`
 );
 const names = await res.json();
 return names.map((name: string) => ({
  name: name,
 }));
}

export async function generateMetadata({
 params,
}: {
 params: { name: string };
}): Promise<Metadata> {
 const result = await getName(params.name);
 return {
  title: `${params.name} - 이름 결과`,
  description: `${params.name}의 미국식 이름 정보`,
 };
}

export default function SearchResultPage({
 params,
 result,
}: {
 params: { name: string };
 result: any;
}) {
 if (!result) {
  notFound();
 }

 return (
  <div className={styles.resultPage}>
   <h1 className={styles.name}>{params.name}</h1>
   <p>
    {params.name} 이름을 가진 당신은 미국에서{" "}
    <span className={styles.koreanName}>{result.korean_name}</span>
    입니다.
   </p>
   <p>
    미국에서 <span className={styles.trendYear}>{result.trend_year}</span>년도
    느낌의 이름이죠.
   </p>
   {result.male_top_100 || result.female_top_100 ? (
    <p className={styles.highlight}>
     {params.name}은(는) 미국에서 꾸준히 사랑받는 이름이에요.
    </p>
   ) : null}
   {result.trendy_female_top_100 || result.trendy_male_top_100 ? (
    <p className={styles.highlight}>
     {params.name}은 2024년도 아기 이름 TOP 100에 드는 이름이에요.
    </p>
   ) : null}
   <GoBackButton />
  </div>
 );
}

export async function getStaticProps({ params }: { params: { name: string } }) {
 const result = await getName(params.name);

 if (!result) {
  return {
   notFound: true,
  };
 }

 return {
  props: {
   params,
   result,
  },
  revalidate: 3600,
 };
}
