import SearchResult from "@/app/components/SearchResult";
import getAllNameData from "@/app/utils/getAllNameData";

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
    return <div>Name not found</div>;
  }

  return <SearchResult result={selectedNameData} />;
}

export async function generateStaticParams() {
  const allNameData = await getAllNameData();

  return allNameData.map((data) => ({
    name: data.name,
  }));
}
