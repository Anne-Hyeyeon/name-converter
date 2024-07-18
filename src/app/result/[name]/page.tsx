import { NameData } from "@/app/page";
import styles from "./SearchResult.module.css";

interface SearchResultProps {
  result: NameData;
}

export default function SearchResult({ result }: SearchResultProps) {
  return (
    <div className={styles.resultPage}>
      <h1 className={styles.name}>{result.name}</h1>
      <p>
        {result.name} 이름을 가진 당신은 미국에서{" "}
        <span className={styles.koreanName}>{result.koreanName}</span> 입니다.
      </p>
      <p>
        미국에서 <span className={styles.trendYear}>{result.trendYear}</span>
        년도 느낌의 이름이죠.
      </p>
      {result.maleTop100 || result.femaleTop100 ? (
        <p className={styles.highlight}>
          {result.name}은(는) 미국에서 꾸준히 사랑받는 이름이에요.
        </p>
      ) : null}
      {result.trendyFemaleTop100 || result.trendyMaleTop100 ? (
        <p className={styles.highlight}>
          {result.name}은 2024년도 아기 이름 TOP 100에 드는 이름이에요.
        </p>
      ) : null}
    </div>
  );
}
