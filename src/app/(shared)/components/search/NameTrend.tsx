import Link from "next/link";
import styles from "./NameTrend.module.css";
import type { NameTrendData } from "../../utils/getNameTrend";

const WIDTH = 320;
const HEIGHT = 140;
const PADDING = { top: 22, right: 12, bottom: 22, left: 12 };
const FIRST_YEAR = 1880;
const AXIS_YEARS = [1900, 1950, 2000];
const RARE_PEAK_COUNT = 50;

interface NameTrendProps {
  name: string;
  trend: NameTrendData;
  lastYear: number;
  sheetTrendYear?: string;
}

const isRevival = (trend: NameTrendData, sheetTrendYear?: string) => {
  const eraEnd = Number(sheetTrendYear?.match(/-(\d{4})/)?.[1]);
  return (
    eraEnd > 0 &&
    eraEnd <= 1980 &&
    trend.latestRank !== null &&
    trend.latestRank <= 1000 &&
    trend.latestCount >= trend.peakCount * 0.5
  );
};

export default function NameTrend({
  name,
  trend,
  lastYear,
  sheetTrendYear,
}: NameTrendProps) {
  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const x = (year: number) =>
    PADDING.left + ((year - FIRST_YEAR) / (lastYear - FIRST_YEAR)) * plotWidth;
  const y = (count: number) =>
    PADDING.top + plotHeight - (count / trend.peakCount) * plotHeight;
  const baseline = PADDING.top + plotHeight;

  const points = trend.births.map(
    (count, i) => `${x(trend.start + i).toFixed(1)},${y(count).toFixed(1)}`
  );
  const line = `M${points.join("L")}`;
  const area = `${line}L${x(lastYear).toFixed(1)},${baseline}L${x(trend.start).toFixed(1)},${baseline}Z`;

  const isRare = trend.peakCount < RARE_PEAK_COUNT;
  const peakX = x(trend.peakYear);
  const peakLabelX = Math.min(
    Math.max(peakX, PADDING.left + 18),
    WIDTH - PADDING.right - 18
  );

  return (
    <section className={styles.trend}>
      <h2 className={styles.title}>📈 미국에서 태어난 {name}</h2>
      <p className={styles.caption}>
        연도별 출생아 수 ({FIRST_YEAR}-{lastYear})
      </p>
      {isRare ? (
        <p className={styles.rare}>미국에서도 아주 드문 이름이에요.</p>
      ) : (
        <svg
          className={styles.chart}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={`${name} 이름의 연도별 출생아 수 그래프, ${trend.peakYear}년에 가장 많음`}
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
          {AXIS_YEARS.map((year) => (
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
          가장 많이 태어난 해:{" "}
          <Link href={`/year/${trend.peakYear}`} className={styles.yearLink}>
            <strong>{trend.peakYear}년</strong>
          </Link>{" "}
          ({trend.peakCount.toLocaleString("ko-KR")}명)
        </li>
        <li>
          {trend.latestRank !== null ? (
            <>
              {lastYear}년 순위:{" "}
              <strong>{trend.latestRank.toLocaleString("ko-KR")}위</strong>
            </>
          ) : (
            <>{lastYear}년에는 5명 미만으로 태어났어요</>
          )}
        </li>
      </ul>
      {isRevival(trend, sheetTrendYear) && (
        <p className={styles.revival}>🔁 옛날 이름이 요즘 다시 인기예요!</p>
      )}
      <p className={styles.source}>출처: 미국 사회보장국(SSA)</p>
    </section>
  );
}
