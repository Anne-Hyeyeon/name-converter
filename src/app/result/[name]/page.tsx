import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./SearchResultPage.module.css";
import GoBackButton from "@/app/components/GoBackButton";
import sheets from "../../../../google-sheets-api";

type NameData = {
 [key: string]: string;
};

async function getName(name: string): Promise<NameData | null> {
 try {
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

  const result = data.find(
   (row) => row[0].toLowerCase() === name.toLowerCase()
  );
  if (!result) {
   throw new Error("Name not found");
  }

  const resultObj = headers.reduce((obj: NameData, header, index) => {
   obj[header] = result[index];
   return obj;
  }, {} as NameData);

  return resultObj;
 } catch (error) {
  console.error("Error fetching name data:", error);
  return null;
 }
}

export async function generateStaticParams(): Promise<
 { params: { name: string } }[]
> {
 try {
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

  const names = rows.slice(1).map((row) => row[0]);

  return names.map((name) => ({ params: { name } }));
 } catch (error) {
  console.error("Error fetching names:", error);
  return [];
 }
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
