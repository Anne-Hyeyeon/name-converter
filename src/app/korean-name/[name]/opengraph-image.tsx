import { ImageResponse } from "next/og";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { findName } from "@/app/(shared)/utils/findName";
import { getEmoji } from "@/app/(shared)/utils";
import { loadOgFont } from "@/app/(shared)/utils/loadOgFont";
import { getDictionary } from "../i18n";
import { getGenerationByCharacteristic, toGender } from "../utils/generation";
import { romanizeName } from "../utils/romanize";

export const alt = "Am I Chunja?! My Korean name";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const t = getDictionary();

export default async function Image({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = findName(await getAllNameData(), name);
  const characteristic = Number(data?.characteristic);
  const generation =
    data?.koreanName && characteristic !== 10
      ? getGenerationByCharacteristic(characteristic)
      : null;
  const gender = toGender(data?.gender);

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
      <div style={{ display: "flex", fontSize: 34, color: "#495057" }}>
        {t.siteName} 🙉
      </div>
      <div style={{ display: "flex", fontSize: 104, lineHeight: 1.1, marginTop: 8 }}>
        {data ? data.name : decodeURIComponent(name)}
      </div>
      {data && generation ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 46,
              marginTop: 18,
            }}
          >
            in Korea is
            <span
              style={{
                fontSize: 84,
                margin: "0 18px",
                padding: "0 10px",
                background: "linear-gradient(transparent 60%, #fff4a8 60%)",
              }}
            >
              {data.koreanName}
            </span>
            ({romanizeName(data.koreanName)})
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 26,
              padding: "10px 30px",
              borderRadius: 999,
              background: "#212529",
              color: "#ffffff",
              fontSize: 44,
            }}
          >
            {getEmoji(gender, characteristic)}{" "}
            {t.withArticle(t.generations[generation].label)}{" "}
            {t.result.labelSuffix}!
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", fontSize: 48, marginTop: 24 }}>
          What&apos;s my Korean name? 👵
        </div>
      )}
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
