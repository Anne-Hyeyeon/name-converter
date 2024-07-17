import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./SearchResultPage.module.css";
import GoBackButton from "@/app/components/GoBackButton";
import sheets from "../../../../google-sheets-api";

type NameData = {
 [key: string]: string;
};

async function getNameData(): Promise<NameData[]> {
 const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
 if (!SPREADSHEET_ID) {
  throw new Error("Missing SPREADSHEET_ID environment variable");
 }

 const range = "names!A1:J4795";
 const response = await sheets.spreadsheets.values.get({
  spreadsheetId: SPREADSHEET_ID,
  range,
 });

 const rows = response.data.values as string[][];
 if (!rows) {
  throw new Error("No data found");
 }

 const headers = rows[0].map((header) =>
  header.toLowerCase().replace(/\s+/g, "_")
 );
 const data = rows.slice(1);

 return data.map((row) => {
  const obj = {} as NameData;
  headers.forEach((header, index) => {
   obj[header] = row[index];
  });
  return obj;
 });
}

export async function generateStaticParams() {
 const data = await getNameData();
 return data.map((item) => ({
  params: { name: item.name.toLowerCase() },
 }));
}

export async function generateMetadata({
 params,
}: {
 params: { name: string };
}): Promise<Metadata> {
 const data = await getNameData();
 const result = data.find(
  (item) => item.name.toLowerCase() === params.name.toLowerCase()
 );
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
 const data = await getNameData();
 const result = data.find(
  (item) => item.name.toLowerCase() === params.name.toLowerCase()
 );

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
