import { NextRequest, NextResponse } from "next/server";
import sheets from "../../../../google-sheets-api";

type NameRow = string[];
type NameData = {
 [key: string]: string;
};

export async function GET(
 req: NextRequest
): Promise<NextResponse<string[] | NameData | { error: string }>> {
 try {
  console.log("Request URL:", req.url);
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const query = searchParams.get("query");
  const allNames = searchParams.get("allNames");

  if (!name && !query && !allNames) {
   console.error("Name, query, or allNames parameter is required");
   return NextResponse.json<{ error: string }>(
    { error: "Name, query, or allNames parameter is required" },
    { status: 400 }
   );
  }

  const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
  if (!SPREADSHEET_ID) {
   throw new Error("Missing SPREADSHEET_ID environment variable");
  }

  const range = "names!A1:J4795";
  console.log("Fetching data from range:", range);
  const response = await sheets.spreadsheets.values.get({
   spreadsheetId: SPREADSHEET_ID,
   range,
  });

  const rows = response.data.values as NameRow[];
  if (!rows) {
   console.error("No data found");
   return NextResponse.json<{ error: string }>(
    { error: "No data found" },
    { status: 404 }
   );
  }

  const headers = rows[0].map((header: string) =>
   header.toLowerCase().replace(/\s+/g, "_")
  );
  const data: NameRow[] = rows.slice(1);

  if (allNames) {
   const names: string[] = data.map((row: NameRow) => row[0]);
   return NextResponse.json<string[]>(names, { status: 200 });
  }

  if (name) {
   const result = data.find(
    (row: NameRow) => row[0].toLowerCase() === name.toLowerCase()
   );

   if (!result) {
    console.error("Name not found");
    return NextResponse.json<{ error: string }>(
     { error: "Name not found" },
     { status: 404 }
    );
   }

   const resultObj: NameData = headers.reduce(
    (obj: NameData, header: string, index: number) => {
     obj[header] = result[index];
     return obj;
    },
    {}
   );

   return NextResponse.json<NameData>(resultObj, { status: 200 });
  }

  if (query) {
   const filteredNames: string[] = data
    .filter((row: NameRow) =>
     row[0].toLowerCase().includes(query.toLowerCase())
    )
    .map((row: NameRow) => row[0]);

   return NextResponse.json<string[]>(filteredNames, { status: 200 });
  }

  console.error("Invalid query parameters");
  return NextResponse.json<{ error: string }>(
   { error: "Invalid query parameters" },
   { status: 400 }
  );
 } catch (error) {
  console.error("Error fetching data:", error);
  if (error instanceof Error) {
   return NextResponse.json<{ error: string }>(
    { error: error.message },
    { status: 500 }
   );
  } else {
   return NextResponse.json<{ error: string }>(
    { error: "Unknown error occurred" },
    { status: 500 }
   );
  }
 }
}
