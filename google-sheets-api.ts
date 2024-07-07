// google-sheets-api.js
import { google } from "googleapis";
import { readFileSync } from "fs";
import { join } from "path";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS_PATH = join(process.cwd(), "credentials.json");

const auth = new google.auth.GoogleAuth({
 keyFile: CREDENTIALS_PATH,
 scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export default sheets;
