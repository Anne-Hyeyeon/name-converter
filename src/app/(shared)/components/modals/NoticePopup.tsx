import React from "react";
import styles from "./NoticePopup.module.css";

interface NoticePopupProps {
  onClose: () => void;
}

const NoticePopup: React.FC<NoticePopupProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>춘자 사이트를 사랑해주시는 여러분! 😍 </h2>
        <div className={styles.content}>
          <p className={styles.stats}>
            <strong>
              그동안 커피 기부를 통해 사이트 운영에 도움을 주셔서 감사합니다.
            </strong>
          </p>

          <p>
            여러분의 응원 덕분에, 춘자 사이트가 계속해서 발전해 올 수
            있었습니다.
          </p>

          <p>
            보답으로, 제가 가진 이름 데이터를 이용해 새로운{" "}
            <strong>영어 이름 추천 기능</strong>을 개발했습니다.
          </p>

          <div className={styles.highlightSection}>
            <p className={styles.highlight}>
              💖 메인의 사진이나, 결과 페이지의 &apos;개발자 응원하기&apos;를
              눌러
              <br />
              개발자에게 커피 한 잔을 기부해 주세요! ☕
            </p>

            <p className={styles.highlight}>
              🌟 커피 기부 시 필요한 서비스나 사이트 내 기능이 있으면 적어
              주세요.
              <br />
              최대한 반영하도록 하겠습니다!
              <br />
              <small className={styles.exampleText}>
                예: &quot;특정 년도 이름 랭킹&quot;, &quot;닉네임 추천&quot;,
                &quot;이름 궁합&quot; 등
              </small>
            </p>
          </div>

          <p className={styles.stats}>
            <strong>
              &apos;춘자&apos;는 누적 방문자 100만 명을 돌파한 사이트입니다! 🎉
              <br />
            </strong>
          </p>

          <p>춘자와 함께하는 즐거운 이름 여행, 계속해서 응원해 주세요! 💕</p>

          <p className={styles.tmiText}>
            (TMI : 얼마 전 이직에도 성공했습니다. 불경기에도 불구하고 좋은
            성과를 낼 수 있었던 이유는, 모두 여러분의 관심과 사랑 덕분입니다 🥰)
          </p>

          <a
            href="https://www.buymeacoffee.com/annehyeyeon"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.donateButton}
          >
            ☕ 커피 기부하러 가기
          </a>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default NoticePopup;
