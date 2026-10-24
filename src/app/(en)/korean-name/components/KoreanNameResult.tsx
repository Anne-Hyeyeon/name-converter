"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import styles from "@/app/(shared)/components/search/SearchResult.module.css";
import { getEmoji, trackEvent } from "@/app/(shared)/utils";
import { useNavigation } from "@/app/(shared)/hooks";
import { getDictionary, type Gender, type GenerationKey } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import HearButton from "./HearButton";
import GenerationLines from "./GenerationLines";
import BornInKorea from "./BornInKorea";
import KoreanShareButtons from "./KoreanShareButtons";
import localStyles from "../korean-name.module.css";

const t = getDictionary();

export type KoreanNameResultProps = {
  name: string;
  hangul: string | null;
  gender: Gender;
  characteristic: number;
  koreanName: string | null;
  romanized: string | null;
  generation: GenerationKey | null;
  usTrendYear: string | null;
  top3ByYear: Record<number, Record<Gender, string[]>>;
  birthYearRange: [number, number];
  related?: React.ReactNode;
};

export default function KoreanNameResult({
  name,
  hangul,
  gender,
  characteristic,
  koreanName,
  romanized,
  generation,
  usTrendYear,
  top3ByYear,
  birthYearRange,
  related,
}: KoreanNameResultProps) {
  const router = useRouter();
  const { openSupport } = useNavigation();
  const generationText = generation ? t.generations[generation] : null;
  const label = generationText ? generationText.label : null;
  const shareText =
    koreanName && romanized && label
      ? t.result.shareText(koreanName, romanized, label)
      : null;

  const saveImage = useCallback(() => {
    const element = document.getElementById("resultPage");
    if (!element) return;
    html2canvas(element)
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${name}-korean-name.png`;
        link.click();
        trackEvent("save_result_image", { file_name: `${name}-korean-name` });
      })
      .catch(() => alert(t.result.saveFailed));
  }, [name]);

  return (
    <div>
      <div id="resultPage" className={styles.resultPage}>
        {hangul ? (
          <>
            <h1 className={localStyles.spellingTitle}>
              {t.result.spellingTitle(name)}
            </h1>
            <div className={localStyles.spellingCard}>
              <span lang="ko" className={localStyles.hangul}>
                {hangul}
              </span>
              <HearButton hangul={hangul} />
              <p className={localStyles.spellingLede}>
                {t.result.spellingLede(name)}
              </p>
            </div>
          </>
        ) : (
          <h1 className={styles.name}>{name}</h1>
        )}
        <div className={styles.emojiContainer}>
          <span role="img" aria-label="character" className={styles.largeEmoji}>
            {getEmoji(gender, characteristic)}
          </span>
        </div>
        <div className={styles.mainContent}>
          {koreanName && romanized && generationText && label ? (
            <>
              <p className={styles.infoText}>{t.result.lead(name)}</p>
              <p className={styles.infoText}>{t.result.youWouldBe}</p>
              <div className={localStyles.nameCard}>
                <span lang="ko" className={localStyles.hangul}>
                  {koreanName}
                </span>
                <span className={localStyles.romanized}>{romanized}</span>
                <HearButton hangul={koreanName} />
              </div>
              <p className={localStyles.generationBadge}>
                {label} {t.result.labelSuffix} {generationText.emoji}
              </p>
              <div className={styles.messageContainer}>
                <GenerationLines
                  intro={generationText.intro}
                  fun={generationText.fun}
                  seed={name}
                  className={styles.infoText}
                />
              </div>
            </>
          ) : (
            <div className={styles.messageContainer}>
              {t.result.noMatch.map((line) => (
                <p key={line} className={styles.infoText}>
                  {line}
                </p>
              ))}
            </div>
          )}
          {name === "Anne" && (
            <p className={styles.developerNote}>{t.result.developerNote}</p>
          )}
        </div>
        {usTrendYear && (
          <div className={styles.additionalInfo}>
            <p className={styles.highlight}>{t.result.usTrend(name, usTrendYear)}</p>
          </div>
        )}
      </div>
      <BornInKorea
        top3ByYear={top3ByYear}
        defaultGender={gender}
        firstYear={birthYearRange[0]}
        lastYear={birthYearRange[1]}
      />
      {related}
      <div className={localStyles.actions}>
        <KoreanShareButtons
          name={name}
          shareText={shareText}
          onSave={saveImage}
        />
        <button
          type="button"
          className={localStyles.textAction}
          onClick={() => router.push(KOREAN_NAME_URLS.HOME)}
        >
          {t.result.back}
        </button>
        <div className={localStyles.supportArea}>
          <button
            type="button"
            className={localStyles.supportAction}
            onClick={openSupport}
          >
            {t.result.support}
          </button>
        </div>
      </div>
    </div>
  );
}
