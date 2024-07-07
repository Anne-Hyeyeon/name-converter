// app/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function Home() {
 const [data, setData] = useState<any>(null);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const res = await fetch("/api/sheets");
    const result = await res.json();
    setData(result);
   } catch (error) {
    console.error("Error:", error);
   }
  };

  fetchData();
 }, []);

 return (
  <div>
   <h1>Google Sheets API Example</h1>
   {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
  </div>
 );
}
