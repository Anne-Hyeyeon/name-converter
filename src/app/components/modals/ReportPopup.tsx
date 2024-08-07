"use client";

import React, { useState } from "react";
import styles from "./ReportPopup.module.css";

interface ReportPopupProps {
 onClose: () => void;
}

const ReportPopup: React.FC<ReportPopupProps> = ({ onClose }) => {
 const [name, setName] = useState(`추천 이름 : \n그 이름을 추천하는 이유 : `);
 const [errorMessage, setErrorMessage] = useState("");

 const handleSubmit = () => {
  const [recommendedName, reason] = name
   .split("\n")
   .map((item) => item.split(":")[1]?.trim() || "");

  if (!recommendedName) {
   setErrorMessage("추천 이름을 입력해주세요.");
   return;
  }

  if (reason.length < 20) {
   setErrorMessage(
    `추천 이유를 20자 이상으로 구체적으로 적어주세요✏️ 
          \n(현재 ${reason.length}자)`
   );
   return;
  }

  const mailtoLink = `mailto:dlswptkfkd@gmail.com?subject=이 이름을 넣어 주세요!&body=${encodeURIComponent(
   `${name}
  
  '내가 춘자라니' 데이터베이스에 이름이 등록되는 기준은 다음과 같습니다:
  1. 미국 출생아 통계에 기반한 실제 사용 빈도
  2. 사용자들의 제보 횟수
  
  현재 검색하신 이름이 데이터베이스에 없다면, 이는 해당 이름의 사용 빈도가 상대적으로 낮거나 아직 충분한 제보가 이루어지지 않았을 수 있습니다. 
  이는 이름의 가치나 특별함을 나타내는 것이 아니라, 단순히 우리 데이터베이스의 현재 상태를 반영할 뿐입니다. 🌱

+ 직장인인 개발자가 퇴근 후 열심히 이름 데이터를 처리하고 있어요. 속도가 늦더라도 양해 부탁드립니다 💕  `
  )}`;

  window.location.href = mailtoLink;
  onClose();
 };

 return (
  <div className={styles.popupOverlay}>
   <div className={styles.popupContent}>
    <h2>이름 제보하기! 💃</h2>
    <textarea
     placeholder="이름, 이름을 추천하는 이유를 제보하세요! (ex. Mike, Jane)"
     value={name}
     onChange={(e) => setName(e.target.value)}
     className={styles.input}
    />
    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    <button onClick={handleSubmit} className={styles.button}>
     보내기
    </button>
    <button onClick={onClose} className={styles.button}>
     닫기
    </button>
   </div>
  </div>
 );
};

export default ReportPopup;
