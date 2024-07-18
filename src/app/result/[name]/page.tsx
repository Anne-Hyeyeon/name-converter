"use client";

import { useParams } from "next/navigation"; // next/router 대신 next/navigation 사용
import { useEffect, useState } from "react";
import SearchResult from "@/app/components/SearchResult";
import { useNameData } from "@/app/context/NameDataContext";
import { NameData } from "@/app/types";

export default function ResultPage() {
  const { name } = useParams(); // useParams 훅을 사용하여 경로 매개변수 가져오기
  const [selectedNameData, setSelectedNameData] = useState<NameData | null>(
    null
  );
  const { nameData } = useNameData();

  useEffect(() => {
    if (name && nameData) {
      const data = nameData.find((item) => item.name === name);
      setSelectedNameData(data || null);
    }
  }, [name, nameData]);

  if (!selectedNameData) {
    return <div>Loading...</div>;
  }
  console.log(selectedNameData);
  return <SearchResult result={selectedNameData} />;
}
