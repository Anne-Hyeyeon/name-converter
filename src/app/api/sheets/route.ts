import { NextRequest, NextResponse } from "next/server";
import sheets from "../../../../google-sheets-api";

export async function GET(req: NextRequest) {
 try {
  const spreadsheetId = "1YDSm2VGYtYkE9YL-VjknaYG7SJiaY93xOxflueF2gbw"; // 제공해주신 스프레드시트 ID
  const range = "names!A1:G1865"; // 원하는 셀 범위를 지정하세요
  const response = await sheets.spreadsheets.values.get({
   spreadsheetId,
   range,
  });
  return NextResponse.json(response.data, { status: 200 });
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
