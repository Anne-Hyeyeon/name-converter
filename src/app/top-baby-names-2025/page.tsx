import type { Metadata } from "next";
import Link from "next/link";
import top100 from "../(shared)/data/top100-2025.json";
import styles from "./page.module.css";

type Entry = { rank: number; boy: string; girl: string };

export const metadata: Metadata = {
  title: "2025 미국 아기이름 Top 100 - 내가 춘자라니",
  description:
    "2025년 미국에서 가장 인기있는 아기 이름 100위까지! 천체·빛의 이름, 부드러운 남자 이름, 베타 세대 트렌드까지 한 번에 살펴보세요.",
  openGraph: {
    title: "2025 미국 아기이름 Top 100",
    description:
      "올해 미국 부모들이 사랑한 이름 Top 100과 2025-2026 작명 트렌드.",
    type: "website",
    siteName: "내가 춘자라니",
  },
};

const TRENDS = [
  {
    icon: "🌙",
    eyebrow: "Trend 01",
    title: "별, 달, 빛 — 우주에 빠진 부모들",
    body: (
      <>
        <p>
          요즘 미국 부모들은 밤하늘에 푹 빠진 모양이에요. <em>Aurora</em>(오로라),{" "}
          <em>Nova</em>(신성), <em>Luna</em>(달), <em>Solana</em>(태양),{" "}
          <em>Elio</em>(태양신) 같이 천체와 빛에서 따온 이름이 우르르 올라오고
          있어요.
        </p>
        <p>
          &ldquo;우리 아이가 세상을 환히 밝혀줬으면&rdquo;이라는 마음이래요. 빛을
          뜻하는 프랑스어 <em>Soleil</em>이나 라틴어 계열의{" "}
          <em>Luca · Lucian</em>도 같이 급상승 중이고요 ✨
        </p>
      </>
    ),
  },
  {
    icon: "🌿",
    eyebrow: "Trend 02",
    title: "부드럽지만 단단한 — 새로운 남자 이름",
    body: (
      <>
        <p>
          예전엔 <em>Jack · John</em>처럼 딱딱한 이름이 정석이었다면, 요즘은
          발음이 부드럽고 짧은 이름이 대세예요. <em>River</em>, <em>Sage</em>,{" "}
          <em>Rowan</em>, <em>Kai</em>, <em>Parker</em>, <em>Charlie</em>처럼요.
        </p>
        <p>
          &ldquo;남자다운 이름&rdquo;이라는 고정관념 대신 자유로운 정체성을
          주고 싶은 부모들이 늘었고, 모바일 시대답게 부르기·기억하기 쉬운
          1~2음절 이름이 강세예요.
        </p>
      </>
    ),
  },
  {
    icon: "🚀",
    eyebrow: "Fun Fact",
    title: "Gen Beta가 시작됐어요",
    body: (
      <>
        <p>
          2025년에 태어난 아기부터는 <strong>베타 세대(Gen Beta)</strong>라고
          부른대요. 알파 세대 다음 타자죠.
        </p>
        <p>
          이 부모들은 디지털 네이티브라 영화·소설 캐릭터 이름을 그대로
          가져오거나, 아예 없던 스펠링을 새로 만들기도 해요. 개성으로 승부하는
          가장 자유로운 세대 🍼
        </p>
      </>
    ),
  },
];

export default function Top100Page() {
  const entries = top100 as Entry[];
  const podium = entries.slice(0, 3);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>BABY NAMES · USA 2025</p>
        <h1 className={styles.title}>
          올해 미국에서 가장
          <br />
          많이 불린 이름들.
        </h1>
        <p className={styles.lede}>
          2025년 미국 신생아 인기 이름 Top 100을 한 페이지에 담았어요.
          <br />
          춘자가 정리해 드리는 보너스 페이지입니다 ☕
        </p>
      </header>

      <section className={styles.section} aria-label="Top 3">
        <h2 className={styles.sectionTitle}>Top 3</h2>
        <ol className={styles.podium}>
          {podium.map((e) => (
            <li
              key={e.rank}
              className={`${styles.podiumItem} ${styles[`rank${e.rank}`]}`}
            >
              <div className={styles.podiumRank}>
                {e.rank === 1 ? "🥇" : e.rank === 2 ? "🥈" : "🥉"}
                <span>#{e.rank}</span>
              </div>
              <div className={styles.podiumNames}>
                <Link
                  href={`/result/${e.boy}`}
                  className={`${styles.podiumNameCol} ${styles.boyCol}`}
                >
                  <span className={styles.podiumLabel}>BOY</span>
                  <span className={styles.podiumName}>{e.boy}</span>
                </Link>
                <div className={styles.podiumDivider} />
                <Link
                  href={`/result/${e.girl}`}
                  className={`${styles.podiumNameCol} ${styles.girlCol}`}
                >
                  <span className={styles.podiumLabel}>GIRL</span>
                  <span className={styles.podiumName}>{e.girl}</span>
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-label="전체 Top 100">
        <h2 className={styles.sectionTitle}>전체 Top 100</h2>
        <p className={styles.tableHelper}>이름을 누르면 결과 페이지로 이동해요.</p>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span className={styles.colRank}>Rank</span>
            <span className={`${styles.colName} ${styles.headerBoy}`}>Boy</span>
            <span className={`${styles.colName} ${styles.headerGirl}`}>Girl</span>
          </div>
          <ul className={styles.tableBody}>
            {entries.map((e) => (
              <li key={e.rank} className={styles.tableRow}>
                <span className={styles.colRank}>{e.rank}</span>
                <Link
                  href={`/result/${e.boy}`}
                  className={`${styles.colName} ${styles.boyName}`}
                >
                  {e.boy}
                </Link>
                <Link
                  href={`/result/${e.girl}`}
                  className={`${styles.colName} ${styles.girlName}`}
                >
                  {e.girl}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-label="2025 트렌드">
        <h2 className={styles.sectionTitle}>2025-2026 작명 트렌드</h2>
        <p className={styles.sectionLede}>
          한 줄로 요약하면 <strong>&ldquo;자연과 우주, 그리고 다문화적
          포용성&rdquo;</strong>. 단순히 예쁜 이름을 넘어, 아이의 정체성과
          부모의 가치관을 담으려는 분위기가 진해졌어요.
        </p>
        <div className={styles.trendGrid}>
          {TRENDS.map((t) => (
            <article key={t.eyebrow} className={styles.trendCard}>
              <div className={styles.trendIcon} aria-hidden="true">
                {t.icon}
              </div>
              <p className={styles.trendEyebrow}>{t.eyebrow}</p>
              <h3 className={styles.trendTitle}>{t.title}</h3>
              <div className={styles.trendBody}>{t.body}</div>
            </article>
          ))}
        </div>
      </section>

      <p className={styles.footnote}>
        2025년 5월 기준 미국 아기 이름 인기 순위. 같은 순위에 남/녀 한 명씩,
        총 200명의 이름이 있어요.
      </p>
    </div>
  );
}
