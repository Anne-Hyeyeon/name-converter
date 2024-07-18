import SearchResult from "@/app/components/SearchResult";
import BackButton from "@/app/components/BackButton";
import getAllNameData from "@/app/utils/getAllNameData";
import styles from "./page.module.css";

export default async function ResultPage({
  params,
}: {
  params: { name: string };
}) {
  const allNameData = await getAllNameData();
  const selectedNameData = allNameData.find(
    (data) => data.name === params.name
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {!selectedNameData ? (
          <div className={styles.notFound}>
            <p>Name not found</p>
          </div>
        ) : (
          <SearchResult result={selectedNameData} />
        )}
        <div className={styles.buttonWrapper}>
          <BackButton href="/">검색창으로 돌아가기</BackButton>
        </div>
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
