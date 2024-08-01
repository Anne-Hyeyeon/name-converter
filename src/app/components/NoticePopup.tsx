import React from "react";
import styles from "./NoticePopup.module.css";

interface NoticePopupProps {
 onClose: () => void;
}

const NoticePopup: React.FC<NoticePopupProps> = ({ onClose }) => {
 return (
  <div className={styles.overlay}>
   <div className={styles.modal}>
    <h2 className={styles.title}>춘자 사이트를 사랑해주시는 여러분! 😭 </h2>
    <div className={styles.content}>
     <p>제곧내인데요... 춘자 사이트가 없어질 위기에 처해 있습니다... 😢</p>

     <p>
      사이트가 많이 알려진 덕분에, 방문자들이 증가하고 있지만
      <br />
      그만큼 유지비가 증가하여 개발자의 아주 알량한... 용돈으로 충당
      중이었습니다. 🙀
     </p>

     <p>
      이대로 가다가는 사이트가 오래 유지되기 어려울 것 같아
      <br />
      여러분에게 도움을 청합니다! 🙏
     </p>

     <div className={`${styles.content} ${styles.highlightSection}`}>
      <p className={styles.highlight}>
       💖 메인의 사진이나, 결과 페이지의 &apos;개발자 응원하기&apos;를 눌러
       <br />
       개발자에게 커피 한 잔을 기부해 주세요! ☕
      </p>

      <p className={styles.highlight}>
       🌟 커피 기부 시 요청사항을 적어주시면
       <br />
       개발 내용에 최대한 반영하도록 하겠습니다.
      </p>

      <p className={styles.highlight}>
       🎨 또한, 배너 광고 게시 문의도 환영합니다.
      </p>
     </div>

     <strong>
      &apos;춘자&apos;는 일 방문자 5만, <br />
      (8/1 10pm 기준) 분당 동시 접속자 수 700명 대의 사이트예요. 🚀
     </strong>

     <p>커피 기부, 광고 게시에 많은 관심 부탁드립니다!</p>

     <p>부디 춘자 사이트가 롱런하는 데에 도움을 주세요! 🙌</p>
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
