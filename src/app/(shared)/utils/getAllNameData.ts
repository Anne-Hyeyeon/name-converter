import { NameData } from "../types";

export default async function getAllNameData(): Promise<NameData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/sheets?allNames=true`, {
      next: { revalidate: 3600 },
    });
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
