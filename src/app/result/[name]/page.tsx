import styles from "./SearchResult.module.css";

type NameData = {
  [key: string]: string;
};

interface SearchResultProps {
  result: NameData;
}

export default function SearchResult({ result }: SearchResultProps) {
  return (
    <div className={styles.resultPage}>
      <h1 className={styles.name}>{result.name}</h1>
      <p>
        {result.name} 이름을 가진 당신은 미국에서{" "}
        <span className={styles.koreanName}>{result.korean_name}</span> 입니다.
      </p>
      <p>
        미국에서 <span className={styles.trendYear}>{result.trend_year}</span>
        년도 느낌의 이름이죠.
      </p>
      {result.male_top_100 || result.female_top_100 ? (
        <p className={styles.highlight}>
          {result.name}은(는) 미국에서 꾸준히 사랑받는 이름이에요.
        </p>
      ) : null}
      {result.trendy_female_top_100 || result.trendy_male_top_100 ? (
        <p className={styles.highlight}>
          {result.name}은 2024년도 아기 이름 TOP 100에 드는 이름이에요.
        </p>
      ) : null}
    </div>
  );
}
