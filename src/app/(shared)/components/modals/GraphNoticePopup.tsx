import React from "react";
import Link from "next/link";
import styles from "./NoticePopup.module.css";

interface GraphNoticePopupProps {
  onClose: () => void;
}

const GraphNoticePopup: React.FC<GraphNoticePopupProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>이름 그래프가 생겼어요! 📈</h2>
        <div className={styles.content}>
          <p className={styles.stats}>
            <strong>
              이제 내 이름이 미국에서 언제 가장 많이 태어났는지 한눈에 볼 수
              있어요.
            </strong>
          </p>

          <p>
            미국 사회보장국(SSA)이 공개한 1880년부터 2025년까지의 출생 기록을
            바탕으로, 이름 결과 페이지에 <strong>연도별 그래프</strong>를
            추가했습니다.
          </p>

          <div className={styles.highlightSection}>
            <p className={styles.highlight}>📈 연도별 출생아 수 그래프</p>
            <p className={styles.highlight}>
              🏆 가장 많이 태어난 해와 2025년 순위
            </p>
            <p className={styles.highlight}>
              🔁 옛날 이름이 요즘 다시 유행 중이라면 알려드려요!
              <br />
              <small className={styles.exampleText}>
                예: Henry, Stella, Theodore
              </small>
            </p>
          </div>

          <p>
            검색창에서 내 이름을 검색하고, 결과 페이지 아래쪽을 확인해 주세요!
            💕
          </p>

          <Link
            href="/result/Anne"
            className={styles.donateButton}
            onClick={onClose}
          >
            📈 Anne 그래프 먼저 보기
          </Link>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default GraphNoticePopup;
