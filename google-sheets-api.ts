import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS || "";
const credentialsString = Buffer.from(credentialsBase64, "base64").toString(
 "utf8"
);
let credentials;

try {
 credentials = JSON.parse(credentialsString);
} catch (error) {
 console.error("Error parsing JSON credentials:", error);
 throw new Error("Invalid GOOGLE_APPLICATION_CREDENTIALS environment variable");
}

const auth = new google.auth.GoogleAuth({
 credentials,
 scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export default sheets;
