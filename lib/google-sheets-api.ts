import "server-only";
import { google, sheets_v4 } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

let cached: sheets_v4.Sheets | null = null;

export function getSheetsClient(): sheets_v4.Sheets {
  if (cached) return cached;

  const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialsBase64) {
    throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS environment variable");
  }

  let credentials;
  try {
    credentials = JSON.parse(
      Buffer.from(credentialsBase64, "base64").toString("utf8")
    );
  } catch {
    throw new Error("Invalid GOOGLE_APPLICATION_CREDENTIALS (base64 JSON expected)");
  }

  const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
  cached = google.sheets({ version: "v4", auth });
  return cached;
}

const RETRY_STATUSES = new Set([429, 500, 502, 503]);
const MAX_ATTEMPTS = 6;

/**
 * 시트 읽기 한도 초과나 일시 오류가 나면 기다렸다가 다시 시도합니다.
 */
export async function withSheetsRetry<T>(request: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await request();
    } catch (error) {
      const status = (error as { code?: number; status?: number }).code ??
        (error as { status?: number }).status;
      if (attempt >= MAX_ATTEMPTS || !RETRY_STATUSES.has(Number(status))) {
        throw error;
      }
      const delay = Math.min(60_000, 2_000 * 2 ** (attempt - 1));
      await new Promise((resolve) => setTimeout(resolve, delay + Math.random() * 1_000));
    }
  }
}
