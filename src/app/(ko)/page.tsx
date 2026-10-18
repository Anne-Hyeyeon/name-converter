import SearchComponent from "@/app/(shared)/components/search/SearchComponent";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";

export const revalidate = 3600;

export const metadata = {
  title: "내가 춘자라니 - 내 영어 이름, 미국에선 몇 년생 느낌일까?",
  alternates: {
    canonical: "/",
    languages: { ko: "/", "zh-Hant-TW": "/zh-tw" },
  },
};

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
