import { NextRequest, NextResponse } from "next/server";
import sheets from "../../../../google-sheets-api";
import * as dotenv from "dotenv";

dotenv.config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "";

if (!SPREADSHEET_ID) {
 throw new Error("Missing SPREADSHEET_ID environment variable");
}

const toSnakeCase = (str: string) =>
 str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

export async function GET(req: NextRequest) {
 try {
  console.log("Request URL:", req.url);
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const query = searchParams.get("query");

  if (!name && !query) {
   console.error("Name or query parameter is required");
   return NextResponse.json(
    { error: "Name or query parameter is required" },
    { status: 400 }
   );
  }

  const range = name ? "names!A1:J4795" : "names!A1:A4795";
  console.log("Fetching data from range:", range);
  const response = await sheets.spreadsheets.values.get({
   spreadsheetId: SPREADSHEET_ID,
   range,
  });

  const rows = response.data.values;
  if (!rows) {
   console.error("No data found");
   return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  if (name) {
   // Find the row that matches the name
   const headers = rows[0].map((header) => toSnakeCase(header));
   const data = rows.slice(1);
   const result = data.find(
    (row) => row[0].toLowerCase() === name.toLowerCase()
   );

   if (!result) {
    console.error("Name not found");
    return NextResponse.json({ error: "Name not found" }, { status: 404 });
   }

   // Convert the result to an object
   const resultObj = headers.reduce(
    (obj: Record<string, any>, header, index) => {
     obj[header] = result[index];
     return obj;
    },
    {}
   );

   return NextResponse.json(resultObj, { status: 200 });
  }

  if (query) {
   const names = rows.slice(1).map((row) => row[0]);
   const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
   );

   return NextResponse.json(filteredNames, { status: 200 });
  }

  console.error("Invalid query parameters");
  return NextResponse.json(
   { error: "Invalid query parameters" },
   { status: 400 }
  );
 } catch (error) {
  console.error("Error fetching data:", error);
  if (error instanceof Error) {
   return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
   return NextResponse.json(
    { error: "Unknown error occurred" },
    { status: 500 }
   );
  }
 }
}
