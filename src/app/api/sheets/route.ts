// src/app/api/names/route.ts
import { NextRequest, NextResponse } from "next/server";
import sheets from "../../../../google-sheets-api";
import { snakeToCamel } from "@/app/utils/snakeToCamel";

type NameRow = string[];
type NameData = {
  [key: string]: string;
};

type ApiResponse =
  | { data: string[] }
  | { data: NameData[] }
  | { data: NameData }
  | { error: string };

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    console.log("Request URL:", req.url);
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const query = searchParams.get("query");
    const allNames = searchParams.get("allNames");

    if (!name && !query && !allNames) {
      console.error("Name, query, or allNames parameter is required");
      return NextResponse.json<ApiResponse>(
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
      return NextResponse.json<ApiResponse>(
        { error: "No data found" },
        { status: 404 }
      );
    }

    const headers = rows[0].map((header: string) =>
      snakeToCamel(header.toLowerCase().replace(/\s+/g, "_"))
    );
    const data: NameRow[] = rows.slice(1);

    if (allNames) {
      const allData: NameData[] = data.map((row: NameRow) => {
        return headers.reduce(
          (obj: NameData, header: string, index: number) => {
            obj[header] = row[index];
            return obj;
          },
          {} as NameData
        );
      });
      return NextResponse.json<ApiResponse>({ data: allData }, { status: 200 });
    }

    if (name) {
      const result = data.find(
        (row: NameRow) => row[0].toLowerCase() === name.toLowerCase()
      );

      if (!result) {
        console.error("Name not found");
        return NextResponse.json<ApiResponse>(
          { error: "Name not found" },
          { status: 404 }
        );
      }

      const resultObj: NameData = headers.reduce(
        (obj: NameData, header: string, index: number) => {
          obj[header] = result[index];
          return obj;
        },
        {} as NameData
      );

      return NextResponse.json<ApiResponse>(
        { data: resultObj },
        { status: 200 }
      );
    }

    if (query) {
      const filteredNames: string[] = data
        .filter((row: NameRow) =>
          row[0].toLowerCase().includes(query.toLowerCase())
        )
        .map((row: NameRow) => row[0]);

      return NextResponse.json<ApiResponse>(
        { data: filteredNames },
        { status: 200 }
      );
    }

    console.error("Invalid query parameters");
    return NextResponse.json<ApiResponse>(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
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
