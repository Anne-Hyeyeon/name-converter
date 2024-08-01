import { Analytics } from "@vercel/analytics/react";
import SearchComponent from "./components/SearchComponent";
import getAllNameData from "./utils/getAllNameData";

export default async function Home() {
 const nameData = await getAllNameData();

 return (
  <>
   <Analytics />
   <SearchComponent allNameData={nameData} />
  </>
 );
}
