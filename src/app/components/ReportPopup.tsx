"use client";

import React, { useState } from "react";
import styles from "./ReportPopup.module.css";

interface ReportPopupProps {
  onClose: () => void;
}

const ReportPopup: React.FC<ReportPopupProps> = ({ onClose }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const mailtoLink = `mailto:dlswptkfkd@gmail.com?subject=이 이름을 넣어 주세요!&body=Suggested name: ${name}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>이름 제보하기! 💃</h2>
        <input
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
