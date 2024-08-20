import { NextRequest, NextResponse } from "next/server";
import { snakeToCamel } from "@/app/utils/snakeToCamel";
import sheets from "../../../../lib/google-sheets-api";

type ChemistryRow = string[];
type ChemistryData = {
 [key: string]: string;
};

type ApiResponse = { data: ChemistryData[] } | { error: string };

export async function GET(
 req: NextRequest
): Promise<NextResponse<ApiResponse>> {
 try {
  console.log("Request URL:", req.url);

  const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
  if (!SPREADSHEET_ID) {
   throw new Error("Missing SPREADSHEET_ID environment variable");
  }

  const range = "chemistry!A1:I1000";
  console.log("Fetching data from range:", range);
  const response = await sheets.spreadsheets.values.get({
   spreadsheetId: SPREADSHEET_ID,
   range,
  });

  const rows = response.data.values as ChemistryRow[];
  if (!rows) {
   console.error("No data found");
   return NextResponse.json<ApiResponse>(
    { error: "No data found" },
    { status: 404 }
   );
  }

  const headers = rows[0].map((header: string) =>
   snakeToCamel(header.toLowerCase().replace(/\s+/g, "_"))
  );
  const data: ChemistryRow[] = rows.slice(1);

  const allData: ChemistryData[] = data.map((row: ChemistryRow) => {
   return headers.reduce(
    (obj: ChemistryData, header: string, index: number) => {
     obj[header] = row[index];
     return obj;
    },
    {} as ChemistryData
   );
  });
  return NextResponse.json<ApiResponse>({ data: allData }, { status: 200 });
 } catch (error) {
  console.error("Error fetching data:", error);
  if (error instanceof Error) {
   return NextResponse.json<ApiResponse>(
    { error: error.message },
    { status: 500 }
   );
  } else {
   return NextResponse.json<ApiResponse>(
    { error: "Unknown error occurred" },
    { status: 500 }
   );
  }
 }
}
