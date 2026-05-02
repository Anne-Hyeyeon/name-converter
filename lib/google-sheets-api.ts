import "server-only";
import { google, sheets_v4 } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

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
