"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NameNotFound.module.css";
import ReportPopup from "./ReportPopup";

export default function NameNotFound({ name }: { name: string }) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleBack = () => {
    router.push("/");
  };

  const handleSupport = () => {
    window.open("https://buymeacoffee.com/annehyeyeon", "_blank");
  };

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
          <p className={styles.infoText}>{name} 이름을 가진 당신은</p>
          <p className={styles.infoText}>
            <span className={styles.koreanName}>매우 특별한 분</span> 입니다.
          </p>
          <div className={styles.messageContainer}>
            <p className={styles.infoText}>이름이 등록되지 않았다고요?</p>
            <p className={styles.infoText}>
              춘자는, <strong>미국 사회보장국</strong>에서 제공하는
            </p>
            <p className={styles.infoText}>
              이름 자료들을 바탕으로 만들어진 사이트예요.
            </p>
            <p className={styles.infoText}>
              <strong>{name}</strong> 이름이 없다면, 해당 이름은
            </p>
            <p className={styles.infoText}>미국에서 잘 사용되지 않는</p>
            <p className={styles.infoText}>특별한 이름일 가능성이 높아요. 🌟</p>
            <p className={styles.infoText}>
              이름이 다음에 해당하는지 확인하세요. 🕵️‍♂️
            </p>
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <p className={styles.highlight}>
            <strong>1. 한국 이름을 그대로 영어 이름으로 전환한 이름.</strong>{" "}
            <br /> ex) Hyeyeon, Minjae, Yeji, Heejung <br /> <br />
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
            <strong>4. 이름이 보편적으로 사용되는 철자가 아닌 경우.</strong>{" "}
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
          <p className={styles.highlight}>
            <strong>6. 그 외...</strong> <br /> 이름이 유럽, 아프리카, 아랍 등{" "}
            <br /> 다른 문화권에서 왔을 가능성이 커요! <br />이 경우, 북미에서는{" "}
            <br />
            외국인 이름 느낌으로 받아들여집니다 :)
          </p>
        </div>
        <p className={styles.reportText}>
          그럼에도 불구하고 이름을 제보하고 싶다면?{" "}
          <div onClick={() => setShowPopup(true)} className={styles.reportLink}>
            이름 제보하기! 🙉
          </div>
          {showPopup && <ReportPopup onClose={() => setShowPopup(false)} />}
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleBack}>
          검색창으로 돌아가기
        </button>
        <button
          className={`${styles.button} ${styles.supportButton}`}
          onClick={handleSupport}
        >
          ☕️ 개발자 응원하기
        </button>
      </div>
    </div>
  );
}
