import SearchComponent from "./components/SearchComponent";
import getAllNameData from "./utils/getAllNameData";

export default async function Home() {
 const nameData = await getAllNameData();

 return (
  <div>
   <SearchComponent allNameData={nameData} />
  </div>
 );
}
