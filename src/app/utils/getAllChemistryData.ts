import { ChemistryData } from "../types";

export default async function getAllChemistryData(): Promise<ChemistryData[]> {
 try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chemistry`);
  if (!res.ok) {
   throw new Error(`HTTP error! status: ${res.status}`);
  }
  const jsonResponse = await res.json();
  if ("error" in jsonResponse) {
   throw new Error(jsonResponse.error);
  }

  console.log(jsonResponse.data);
  return jsonResponse.data as ChemistryData[];
 } catch (error) {
  console.error("Error fetching chemistry data:", error);
  throw error;
 }
}
