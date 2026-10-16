import SearchComponent from "./(shared)/components/search/SearchComponent";
import getAllNameData from "./(shared)/utils/getAllNameData";

export default async function Home() {
  const nameData = await getAllNameData();
  const names = nameData
    .map((data) => data.name)
    .sort((a, b) => a.localeCompare(b));

  return (
    <>
      <SearchComponent names={names} />
    </>
  );
}
