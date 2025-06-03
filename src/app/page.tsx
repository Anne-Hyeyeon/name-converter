import SearchComponent from "./(shared)/components/search/SearchComponent";
import getAllNameData from "./(shared)/utils/getAllNameData";

export default async function Home() {
  const nameData = await getAllNameData();

  return (
    <>
      <SearchComponent allNameData={nameData} />
    </>
  );
}
