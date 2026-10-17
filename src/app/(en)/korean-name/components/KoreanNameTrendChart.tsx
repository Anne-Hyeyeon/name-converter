import Link from "next/link";
import styles from "@/app/(shared)/components/search/NameTrend.module.css";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import type { KoreanNameTrend } from "../utils/koreanNameStats";

const t = getDictionary();

const WIDTH = 320;
const HEIGHT = 140;
const PADDING = { top: 22, right: 14, bottom: 22, left: 14 };
const RARE_PEAK_COUNT = 50;

export default function KoreanNameTrendChart({
  romanized,
  trend,
  peakBornYear,
}: {
  romanized: string;
  trend: KoreanNameTrend;
  peakBornYear: number;
}) {
  const lastYear = trend.firstYear + trend.counts.length - 1;
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const x = (year: number) =>
    PADDING.left + ((year - trend.firstYear) / (lastYear - trend.firstYear)) * plotWidth;
  const y = (count: number) =>
    PADDING.top + plotHeight - (count / trend.peakCount) * plotHeight;
  const baseline = PADDING.top + plotHeight;

  const points = trend.counts.map(
    (count, i) => `${x(trend.firstYear + i).toFixed(1)},${y(count).toFixed(1)}`
  );
  const line = `M${points.join("L")}`;
  const area = `${line}L${x(lastYear).toFixed(1)},${baseline}L${x(trend.firstYear).toFixed(1)},${baseline}Z`;
  const peakX = x(trend.peakYear);
  const peakLabelX = Math.min(
    Math.max(peakX, PADDING.left + 18),
    WIDTH - PADDING.right - 18
  );
  const axisYears = [trend.firstYear, 2015, lastYear];

  return (
    <section className={styles.trend} aria-label={t.trend.title(romanized)}>
      <h2 className={styles.title}>{t.trend.title(romanized)}</h2>
      <p className={styles.caption}>{t.trend.caption(trend.firstYear, lastYear)}</p>
      {trend.peakCount < RARE_PEAK_COUNT ? (
        <p className={styles.rare}>{t.trend.rare}</p>
      ) : (
        <svg
          className={styles.chart}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={t.trend.chartLabel(romanized, trend.peakYear)}
        >
          <path d={area} fill="#fff4a8" />
          <path d={line} fill="none" stroke="#343a40" strokeWidth="1.5" />
          <line
            x1={PADDING.left}
            x2={WIDTH - PADDING.right}
            y1={baseline}
            y2={baseline}
            stroke="#adb5bd"
            strokeWidth="1"
          />
          {axisYears.map((year) => (
            <text
              key={year}
              x={x(year)}
              y={HEIGHT - 6}
              fontSize="10"
              fill="#868e96"
              textAnchor="middle"
            >
              {year}
            </text>
          ))}
          <circle cx={peakX} cy={y(trend.peakCount)} r="3.5" fill="#343a40" />
          <text
            x={peakLabelX}
            y={y(trend.peakCount) - 8}
            fontSize="11"
            fontWeight="bold"
            fill="#343a40"
            textAnchor="middle"
          >
            {trend.peakYear}
          </text>
        </svg>
      )}
      <ul className={styles.facts}>
        <li>
          {t.trend.peakYear}{" "}
          <Link
            href={KOREAN_NAME_URLS.born(peakBornYear)}
            className={styles.yearLink}
          >
            <strong>{trend.peakYear}</strong>
          </Link>{" "}
          ({t.trend.atLeast(trend.peakCount)})
        </li>
        <li>{t.trend.total(trend.firstYear, trend.total)}</li>
      </ul>
      <p className={styles.source}>{t.trend.source}</p>
    </section>
  );
}
