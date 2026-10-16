import { ImageResponse } from "next/og";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { findName } from "@/app/(shared)/utils/findName";
import { loadOgFont } from "@/app/(shared)/utils/loadOgFont";
import { KAKAO } from "@/app/(shared)/constants/kakao";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const data = findName(await getAllNameData(), name);
  const koreanName =
    data && data.koreanName && Number(data.characteristic) !== 10
      ? data.koreanName
      : null;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafaf7",
        color: "#111111",
        fontFamily: "NotoSansKR",
      }}
    >
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: 170,
          background: "#fff4a8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 210,
        }}
      >
        🙉
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 88,
          lineHeight: 1.1,
          marginTop: 48,
          letterSpacing: -2,
        }}
      >
        {data ? data.name : decodeURIComponent(name)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 38,
          color: "#868e96",
          marginTop: 18,
        }}
      >
        {koreanName ? (
          <>
            미국에서
            <span style={{ color: "#111111", margin: "0 12px" }}>
              {koreanName}
            </span>
            입니다
          </>
        ) : (
          "미국에서는 어떤 이름일까?"
        )}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#adb5bd",
          marginTop: 56,
          letterSpacing: 2,
        }}
      >
        내가 춘자라니
      </div>
    </div>,
    {
      ...KAKAO.CARD_SIZE,
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
