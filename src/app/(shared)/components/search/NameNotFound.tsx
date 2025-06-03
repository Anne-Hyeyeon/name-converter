"use client";

import React, { useMemo, useState } from "react";
import styles from "./NameNotFound.module.css";
import ReportPopup from "../modals/ReportPopup";
import { useNavigation } from "../../hooks";

export default function NameNotFound({ name }: { name: string }) {
  const { goToMain, openSupport } = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  const emojis = ["🤔", "🤩", "🧐", "🤗", "🥰", "🌟", "🧙", "😎"];

  const randomEmoji = useMemo(() => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }, []);

  return (
    <div>
      <div id="resultPage" className={styles.resultPage}>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.emojiContainer}>
          <span role="img" aria-label="character" className={styles.largeEmoji}>
            {randomEmoji}
          </span>
        </div>

        <div className={styles.mainContent}>
          <p className={styles.infoText}>
            <strong>{name}</strong>에 대한 정보를 찾을 수 없습니다.
          </p>
          <p className={styles.infoText}>
            하지만 걱정하지 마세요! <br />
            <strong>내 이름이 등재되지 않은 이유</strong>를 소개해 드릴게요.
          </p>
        </div>

        <div className={styles.additionalInfo}>
          <p className={styles.highlight}>
            <strong>1. 한국 이름을 그대로 영어로 전환한 경우</strong> <br /> ex)
            Hyeyeon, Minjae, Yeji, Heejung <br /> <br />
            이런 이름은, 미국에서 그대로 &apos;혜연, 민재, 예지, 희정&apos;
            이랍니다 😁
          </p>
          <p className={styles.highlight}>
            <strong>2. 한국 이름을 따서 지은 경우</strong> <br /> ex) Joon,
            Rany, Ria, Rua, Yuna, Yuri, Bona, Hani <br /> <br />이 경우
            미국에서도 그대로 동양계 외국인 이름으로 인식됩니다. 😊
          </p>
          <p className={styles.highlight}>
            <strong>
              3. 이름이 풀 네임의 줄임말, 주로 애칭으로 사용되는 경우
            </strong>{" "}
            <br /> ex) Elly (Elizabeth), Nate (Nathan), Kiki(Katherine),
            Gigi(Georgina) <br /> <br />이 경우에는 풀 네임을 검색해 주세요!{" "}
            <br />
            이름으로 자주 사용되는 애칭의 경우, 곧 등재하도록 하겠습니다. 🫡
          </p>
          <p className={styles.highlight}>
            <strong>4. 이름이 보편적으로 사용되는 철자가 아닌 경우</strong>{" "}
            <br /> ex) Jeniffer(Jennifer), Linsay(Lindsay), Haper(Harper) <br />{" "}
            <br />
            이름의 스펠링을 체크한 후 다시 검색해 주세요!
          </p>
          <p className={styles.highlight}>
            <strong>5. 이름이 고유명사인 경우</strong> <br /> ex) Shine, Love,
            Green, Red, Honey <br /> <br />이 경우, 미국에서는 이름 뜻 그대로
            받아들여집니다. <br />
            고유명사의 경우, 이름보다는 애칭이나 반려동물 이름으로 자주 쓰이니
            참고해주세요!
          </p>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={goToMain}>
          검색창으로 돌아가기
        </button>
        <button
          className={`${styles.button} ${styles.supportButton}`}
          onClick={openSupport}
        >
          ☕️ 개발자 응원하기
        </button>
        <div className={styles.reportText}>
          혹시{" "}
          <span
            className={styles.reportLink}
            onClick={() => setShowPopup(true)}
          >
            등재 요청
          </span>
          을 보내고 싶다면?
        </div>
      </div>

      {showPopup && <ReportPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
