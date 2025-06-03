// components/ResultContent.tsx

import React from "react";
import { NameData } from "../../types";
import { characteristicMessages } from "../../constants/resultMessages";
import styles from "./SearchResult.module.css";

interface ResultContentProps {
  result: NameData;
}

export const ResultContent: React.FC<ResultContentProps> = ({ result }) => {
  const renderMainInfo = () => {
    if (Number(result.characteristic) === 10) return null;

    return (
      <>
        <p className={styles.infoText}>{result.name} 이름을 가진 당신은</p>
        <p className={styles.infoText}>
          미국에서{" "}
          <span className={styles.koreanName}>{result.koreanName}</span> 입니다.
        </p>
        {renderTrendYear()}
      </>
    );
  };

  const renderTrendYear = () => {
    if ([7, 8, 9, 10].includes(Number(result.characteristic))) return null;

    return (
      <p className={styles.infoText}>
        주로 <span className={styles.trendYear}>{result.trendYear}</span> 년도에
        유행했고,
      </p>
    );
  };

  const renderCharacteristicMessages = () => {
    return characteristicMessages[result.characteristic - 1]?.map(
      (line, index) => (
        <p key={index} className={styles.infoText}>
          {line}
        </p>
      )
    );
  };

  const renderDeveloperNote = () => {
    if (result.name !== "Anne") return null;

    return (
      <>
        <p className={styles.developerNote}>
          이 앱을 만든 개발자의 이름이에요... 소곤소곤
        </p>
        <p className={styles.developerNote}>
          아무래도 이름을 바꿔야 할까봐요...
        </p>
      </>
    );
  };

  const renderAdditionalInfo = () => {
    return (
      <div className={styles.additionalInfo}>
        {(result.maleTop || result.femaleTop) && (
          <p className={styles.highlight}>
            <strong>{result.name}</strong>은(는) 미국에서 꾸준히 사랑받는
            이름이에요.
          </p>
        )}
        {(result.trendyFemaleTop || result.trendyMaleTop) && (
          <p className={styles.highlight}>
            <strong>{result.name}</strong>은(는) 2024년 아기 이름 TOP 100에 드는
            이름이에요.
          </p>
        )}
        {result.doggyName && (
          <p className={styles.highlight}>
            <strong>{result.name}</strong>은(는) 반려견 이름으로도 자주 사용되는
            이름이에요!
          </p>
        )}
        {result.comment && <p className={styles.highlight}>{result.comment}</p>}
      </div>
    );
  };

  return (
    <>
      <div className={styles.mainContent}>
        {renderMainInfo()}
        <div className={styles.messageContainer}>
          {renderCharacteristicMessages()}
        </div>
        {renderDeveloperNote()}
      </div>
      {renderAdditionalInfo()}
    </>
  );
};
