// src/app/api/names/route.ts
import { NextRequest, NextResponse } from "next/server";
import { snakeToCamel } from "@/app/utils/snakeToCamel";
import sheets from "../../../../lib/google-sheets-api";

type NameRow = string[];
type NameData = {
  [key: string]: string | number | boolean;
};

type ApiResponse = { data: NameData[] } | { error: string };

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    console.log("Request URL:", req.url);
    const { searchParams } = new URL(req.url);
    const allNames = searchParams.get("allNames");

    if (!allNames) {
      console.error("allNames parameter is required");
      return NextResponse.json<ApiResponse>(
        { error: "allNames parameter is required" },
        { status: 400 }
      );
    }

    const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
    if (!SPREADSHEET_ID) {
      throw new Error("Missing SPREADSHEET_ID environment variable");
    }

    const range = "names!A1:O5000";
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

    const allData: NameData[] = data.map((row: NameRow) => {
      const obj = headers.reduce(
        (acc: NameData, header: string, index: number) => {
          acc[header] = row[index];
          return acc;
        },
        {} as NameData
      );

      // 숫자 필드들을 실제 숫자로 변환
      const numericFields = ["characteristic", "feelingNum", "births"];
      numericFields.forEach((field) => {
        if (obj[field] && obj[field] !== "") {
          const numValue = parseInt(obj[field] as string);
          if (!isNaN(numValue)) {
            obj[field] = numValue as any;
          }
        }
      });

      // 불린 필드들을 실제 불린으로 변환
      const booleanFields = [
        "femaleTop",
        "maleTop",
        "trendyFemaleTop",
        "trendyMaleTop",
        "doggyName",
      ];
      booleanFields.forEach((field) => {
        if (obj[field]) {
          obj[field] =
            obj[field] === "TRUE" ||
            obj[field] === "1" ||
            obj[field] === "true";
        }
      });

      return obj;
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
