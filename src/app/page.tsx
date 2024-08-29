import SearchComponent from "./components/search/SearchComponent";
import getAllNameData from "./utils/getAllNameData";

export default async function Home() {
 const nameData = await getAllNameData();

 return (
  <>
   <SearchComponent allNameData={nameData} />
  </>
 );
}
