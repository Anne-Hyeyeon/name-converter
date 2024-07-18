import SearchComponent from "./components/SearchComponent";

export type NameData = {
  name: string;
  koreanName: string;
  trendYear: string;
  maleTop100?: boolean;
  femaleTop100?: boolean;
  trendyFemaleTop100?: boolean;
  trendyMaleTop100?: boolean;
};

async function getAllNameData(): Promise<NameData[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sheets?allNames=true`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const jsonResponse = await res.json();
    if ("error" in jsonResponse) {
      throw new Error(jsonResponse.error);
    }
    return jsonResponse.data as NameData[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default async function Home() {
  const allNameData = await getAllNameData();

  if (!allNameData || allNameData.length === 0) {
    throw new Error("데이터를 불러오는 중 문제가 발생했습니다.");
  }

  return (
    <div>
      <SearchComponent allNameData={allNameData} />
    </div>
  );
}
