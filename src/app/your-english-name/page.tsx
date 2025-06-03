import EnglishNameComponent from "../(shared)/components/english-name/EnglishNameComponent";
import getAllNameData from "../(shared)/utils/getAllNameData";

export default async function YourEnglishNamePage() {
  const nameData = await getAllNameData();

  return (
    <>
      <EnglishNameComponent allNameData={nameData} />
    </>
  );
}
