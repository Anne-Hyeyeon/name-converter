import { ImageResponse } from "next/og";
import { loadOgFont } from "@/app/(shared)/utils/loadOgFont";
import { getDictionary } from "./i18n";

export const alt = "Am I Chunja?! What's my Korean name?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const t = getDictionary();

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        color: "#000000",
        fontFamily: "NotoSansKR",
      }}
    >
      <div style={{ display: "flex", fontSize: 40, color: "#495057" }}>
        {t.siteName} 🙉
      </div>
      <div style={{ display: "flex", fontSize: 140, marginTop: 10 }}>🇰🇷</div>
      <div style={{ display: "flex", fontSize: 72, marginTop: 10 }}>
        What&apos;s my Korean name?
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 40,
          marginTop: 18,
          padding: "0 10px",
          background: "linear-gradient(transparent 60%, #fff4a8 60%)",
        }}
      >
        The Korean name from your generation
      </div>
    </div>,
    {
      ...size,
      emoji: "twemoji",
      fonts: [
        {
          name: "NotoSansKR",
          data: await loadOgFont(),
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
