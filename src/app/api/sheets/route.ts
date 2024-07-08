import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import * as dotenv from "dotenv";

dotenv.config();

const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS || "";
const credentialsString = Buffer.from(credentialsBase64, "base64").toString(
 "utf8"
);
const credentials = JSON.parse(credentialsString);

const auth = new google.auth.GoogleAuth({
 credentials,
 scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "";

// Convert header names to a consistent format (e.g., snake_case)
const toSnakeCase = (str: string) =>
 str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

export async function GET(req: NextRequest) {
 try {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const query = searchParams.get("query");

  if (!name && !query) {
   return NextResponse.json(
    { error: "Name or query parameter is required" },
    { status: 400 }
   );
  }

  const range = name ? "names!A1:J4795" : "names!A1:A4795";
  const response = await sheets.spreadsheets.values.get({
   spreadsheetId: SPREADSHEET_ID,
   range,
  });

  const rows = response.data.values;
  if (!rows) {
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
