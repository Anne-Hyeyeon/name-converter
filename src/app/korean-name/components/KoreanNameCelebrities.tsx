import trendStyles from "@/app/(shared)/components/search/NameTrend.module.css";
import { getDictionary } from "../i18n";
import type { KoreanCelebrities } from "../utils/koreanCelebrities";
import styles from "../korean-name.module.css";

const t = getDictionary();

export default function KoreanNameCelebrities({
  romanized,
  celebrities,
}: {
  romanized: string;
  celebrities: KoreanCelebrities;
}) {
  const rest = celebrities.total - celebrities.people.length;

  return (
    <section
      className={trendStyles.trend}
      aria-label={t.celebrities.title(romanized)}
    >
      <h2 className={trendStyles.title}>{t.celebrities.title(romanized)}</h2>
      <p className={trendStyles.caption}>{t.celebrities.caption}</p>
      <ul className={styles.celebrities}>
        {celebrities.people.map((person) => (
          <li key={`${person.fullName}-${person.birthYear}`} className={styles.celebrity}>
            <span className={styles.celebrityName}>
              {person.romanized} <span lang="ko">({person.fullName})</span>
            </span>
            <span className={styles.celebrityMeta}>
              {[
                person.group,
                person.occupation && t.celebrities.occupations[person.occupation],
                t.celebrities.born(person.birthYear),
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </li>
        ))}
      </ul>
      {rest > 0 && <p className={styles.celebrityMore}>{t.celebrities.more(rest)}</p>}
      <p className={trendStyles.source}>{t.celebrities.source}</p>
    </section>
  );
}
