import { NextRequest, NextResponse } from "next/server";
import { snakeToCamel } from "@/app/(shared)/utils/snakeToCamel";
import sheets from "../../../../lib/google-sheets-api";

type NameRow = string[];
type NameData = {
  [key: string]: string | number | boolean;
};
type ApiResponse = { data: NameData[] } | { error: string };

const NUMERIC_FIELDS = ["characteristic", "feelingNum", "births"];
const BOOLEAN_FIELDS = [
  "femaleTop",
  "maleTop",
  "trendyFemaleTop",
  "trendyMaleTop",
  "doggyName",
];
const SPREADSHEET_RANGE = "names!A1:O5000";

const convertToNumber = (value: string): number | string => {
  if (!value || value === "") return value;
  const numValue = parseInt(value);
  return !isNaN(numValue) ? numValue : value;
};

const convertToBoolean = (value: string): boolean => {
  return value === "TRUE" || value === "1" || value === "true";
};

const processRowData = (row: NameRow, headers: string[]): NameData => {
  const obj = headers.reduce((acc: NameData, header: string, index: number) => {
    acc[header] = row[index] || "";
    return acc;
  }, {} as NameData);

  NUMERIC_FIELDS.forEach((field) => {
    if (obj[field]) {
      obj[field] = convertToNumber(obj[field] as string);
    }
  });

  BOOLEAN_FIELDS.forEach((field) => {
    if (obj[field]) {
      obj[field] = convertToBoolean(obj[field] as string);
    }
  });

  return obj;
};

const validateEnvironment = (): string => {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing SPREADSHEET_ID environment variable");
  }
  return spreadsheetId;
};

const processHeaders = (headerRow: string[]): string[] => {
  return headerRow.map((header: string) =>
    snakeToCamel(header.toLowerCase().replace(/\s+/g, "_"))
  );
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const allNames = searchParams.get("allNames");

    if (!allNames) {
      console.error("Missing required parameter: allNames");
      return NextResponse.json<ApiResponse>(
        { error: "allNames parameter is required" },
        { status: 400 }
      );
    }

    const spreadsheetId = validateEnvironment();

    console.log("Fetching data from range:", SPREADSHEET_RANGE);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: SPREADSHEET_RANGE,
    });

    const rows = response.data.values as NameRow[];
    if (!rows || rows.length === 0) {
      console.error("No data found in spreadsheet");
      return NextResponse.json<ApiResponse>(
        { error: "No data found" },
        { status: 404 }
      );
    }

    const headers = processHeaders(rows[0]);
    const dataRows = rows.slice(1);

    const processedData: NameData[] = dataRows.map((row) =>
      processRowData(row, headers)
    );

    console.log(`Successfully processed ${processedData.length} records`);

    return NextResponse.json<ApiResponse>(
      { data: processedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sheets API:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json<ApiResponse>(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
