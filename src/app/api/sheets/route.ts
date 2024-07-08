import { NextRequest, NextResponse } from "next/server";
import sheets from "../../../../google-sheets-api";

// Convert header names to a consistent format (e.g., snake_case)
const toSnakeCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const query = searchParams.get("query");

    const spreadsheetId = "1YDSm2VGYtYkE9YL-VjknaYG7SJiaY93xOxflueF2gbw";

    if (name) {
      const range = "names!A1:J4795";
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values;
      if (!rows) {
        return NextResponse.json({ error: "No data found" }, { status: 404 });
      }

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
      const range = "names!A1:A4795"; // Assuming names are in the first column
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values;
      if (!rows) {
        return NextResponse.json({ error: "No data found" }, { status: 404 });
      }

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
