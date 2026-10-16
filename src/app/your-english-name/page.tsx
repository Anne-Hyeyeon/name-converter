import EnglishNameComponent from "../(shared)/components/english-name/EnglishNameComponent";
import getAllNameData from "../(shared)/utils/getAllNameData";
import { getAvailableCombos } from "../(shared)/utils";

export const revalidate = 3600;

export default async function YourEnglishNamePage() {
  const nameData = await getAllNameData();
  const availableCombos = getAvailableCombos(nameData);

  return (
    <>
      <EnglishNameComponent availableCombos={availableCombos} />
    </>
  );
}
