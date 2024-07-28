import { NameData } from "../types";

export default async function getAllNameData(): Promise<NameData[]> {
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
