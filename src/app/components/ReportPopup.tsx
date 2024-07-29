"use client";

import React, { useState } from "react";
import styles from "./ReportPopup.module.css";

interface ReportPopupProps {
 onClose: () => void;
}

const ReportPopup: React.FC<ReportPopupProps> = ({ onClose }) => {
 const [name, setName] = useState("");

 const handleSubmit = () => {
  const mailtoLink = `mailto:dlswptkfkd@gmail.com?subject=이 이름을 넣어 주세요!&body=Suggested name: ${name}%0D%0A%0D%0A잠깐! 혹시 제보하려는 이름이 Hyeyeon(혜연), Haeun(하은) 처럼 한국어를 영어로 그대로 옮긴 이름은 아닌가요?%0D%0AHyeyeon은 미국에서도 혜연입니다ㅠ_ㅠ%0D%0A%0D%0A'내가 춘자라니'는, 미국 영어이름의 유행 시기를 알아볼 수 있는 프로그램으로서,%0D%0A한국어 이름을 따서 만든 영어 이름의 경우, 정확한 결과 측정이 불가능한 점 양해 부탁드립니다. 🥺`;
  window.location.href = mailtoLink;
  onClose();
 };

 return (
  <div className={styles.popupOverlay}>
   <div className={styles.popupContent}>
    <h2>이름 제보하기! 💃</h2>
    <input
     placeholder="이름을 제보하세요! (ex. Mike, Jane)"
     type="text"
     value={name}
     onChange={(e) => setName(e.target.value)}
     className={styles.input}
    />
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
