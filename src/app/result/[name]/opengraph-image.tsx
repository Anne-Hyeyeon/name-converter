import { ImageResponse } from "next/og";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { findName } from "@/app/(shared)/utils/findName";
import { getEmoji } from "@/app/(shared)/utils";
import { loadOgFont } from "@/app/(shared)/utils/loadOgFont";

export const alt = "내가 춘자라니 이름 검색 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = findName(await getAllNameData(), name);

  const hasKoreanName =
    data && data.koreanName && Number(data.characteristic) !== 10;
  const hasTrendYear =
    hasKoreanName &&
    data.trendYear &&
    ![7, 8, 9].includes(Number(data.characteristic));

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
      <div
        style={{
          display: "flex",
          fontSize: 34,
          color: "#495057",
          marginBottom: 12,
        }}
      >
        내가 춘자라니 🙉
      </div>
      <div style={{ display: "flex", fontSize: 120, lineHeight: 1.1 }}>
        {data ? data.name : decodeURIComponent(name)}
      </div>
      {data && (
        <div style={{ display: "flex", fontSize: 110, marginTop: 8 }}>
          {getEmoji(data.gender, data.characteristic)}
        </div>
      )}
      {hasKoreanName ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 52,
            marginTop: 16,
          }}
        >
          미국에서
          <span
            style={{
              fontSize: 76,
              margin: "0 18px",
              padding: "0 10px",
              background: "linear-gradient(transparent 60%, #fff4a8 60%)",
            }}
          >
            {data.koreanName}
          </span>
          입니다
        </div>
      ) : (
        <div style={{ display: "flex", fontSize: 48, marginTop: 24 }}>
          내 영어 이름은 미국에서 어떤 이미지일까?
        </div>
      )}
      {hasTrendYear && (
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#495057",
            marginTop: 14,
          }}
        >
          {data.trendYear}년도에 유행한 이름
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
