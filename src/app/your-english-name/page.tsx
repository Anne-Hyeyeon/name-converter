import EnglishNameComponent from "../(shared)/components/english-name/EnglishNameComponent";
import getAllNameData from "../(shared)/utils/getAllNameData";
import { getAvailableCombos } from "../(shared)/utils";

export default async function YourEnglishNamePage() {
  const nameData = await getAllNameData();
  const availableCombos = getAvailableCombos(nameData);

  return (
    <>
      <EnglishNameComponent availableCombos={availableCombos} />
    </>
  );
}
