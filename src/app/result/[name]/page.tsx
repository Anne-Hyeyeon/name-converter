import SearchResult from "@/app/components/SearchResult";
import getAllNameData from "@/app/utils/getAllNameData";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const BackButton = dynamic(() => import("@/app/components/BackButton"), {
  ssr: false,
});

export default async function ResultPage({
  params,
}: {
  params: { name: string };
}) {
  const allNameData = await getAllNameData();
  const selectedNameData = allNameData.find(
    (data) => data.name === params.name
  );

  if (!selectedNameData) {
    return (
      <div className={styles.notFound}>
        <p>Name not found</p>
        <div className={styles.buttonWrapper}>
          <BackButton href="/">검색창으로 돌아가기</BackButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.resultContainer}>
      <SearchResult result={selectedNameData} />
      <div className={styles.buttonWrapper}>
        <BackButton href="/">검색창으로 돌아가기</BackButton>
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
