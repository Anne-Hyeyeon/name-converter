"use client";

import { useEffect } from "react";
import SearchComponent from "./components/SearchComponent";
import { NameData } from "./types";
import { useNameData } from "./context/NameDataContext";

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

export default function Home() {
  const { nameData, setNameData } = useNameData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allNameData = await getAllNameData();
        setNameData(allNameData);
      } catch (error) {
        console.error("데이터를 불러오는 중 문제가 발생했습니다:", error);
      }
    };
    fetchData();
  }, [setNameData]);

  if (!nameData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchComponent allNameData={nameData} />
    </div>
  );
}
