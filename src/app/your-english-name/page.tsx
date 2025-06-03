import EnglishNameComponent from "../components/english-name/EnglishNameComponent";
import getAllNameData from "../utils/getAllNameData";

export default async function YourEnglishNamePage() {
  const nameData = await getAllNameData();

  return (
    <>
      <EnglishNameComponent allNameData={nameData} />
    </>
  );
}
