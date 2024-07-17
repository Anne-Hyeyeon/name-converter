import SearchComponent from "./components/SearchComponent";

async function getNames() {
 const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/sheets?allNames=true`,
  {
   cache: "force-cache",
  }
 );
 if (!res.ok) {
  throw new Error("Failed to fetch names");
 }
 return res.json();
}

export default async function Home() {
 const names = await getNames();

 return (
  <div>
   <h1>영어 이름을 검색하세요!</h1>
   <SearchComponent names={names} />
  </div>
 );
}
