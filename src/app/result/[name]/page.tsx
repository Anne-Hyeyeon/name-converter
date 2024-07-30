import SearchResult from "@/app/components/SearchResult";
import getAllNameData from "@/app/utils/getAllNameData";
import styles from "./page.module.css";
import NameNotFound from "@/app/components/NameNotFound";

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
          <NameNotFound name={params.name} />
        ) : (
          <SearchResult result={selectedNameData} />
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
