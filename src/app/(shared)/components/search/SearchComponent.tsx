"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { NameData } from "../../types";
import styles from "./SearchComponent.module.css";
import ReportPopup from "../modals/ReportPopup";
import Image from "next/image";
import UpdateBoard from "../UpdateBoard";
import { getAllUpdateData } from "../../utils/getAllUpdateData";
import NoticePopupWrapper from "../modals/NoticePopupWrapper";

interface SearchComponentProps {
  allNameData: NameData[];
}

export default function SearchComponent({ allNameData }: SearchComponentProps) {
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdateBoard, setShowUpdateBoard] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode | null>(
    null
  );
  const router = useRouter();

  const updateData = getAllUpdateData();

  const filteredNames = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return [];
    return allNameData
      .filter((data) => data.name.toLowerCase().startsWith(trimmedQuery))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 10);
  }, [allNameData, query]);

  const handleSearch = (name: NameData) => {
    router.push(`/result/${name.name}`);
  };

  const isSearching = query.trim() !== "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    const englishOnly = /^[a-zA-Z\s]*$/;

    if (inputValue.length > 10) {
      setErrorMessage(<p>이름이 너무 길어요! 😅</p>);
    } else if (!englishOnly.test(inputValue)) {
      setErrorMessage(
        <>
          <p>한국어, 숫자, 특수문자는 입력이 불가능합니다. 😭</p>
          <p>영어 이름만 입력하세요!</p>
        </>
      );
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>영어 이름을 검색하세요! 🧑‍💻</h1>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="영어 이름을 입력하세요. ex) Anne"
        value={query}
        className={styles.input}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <div
        className={`${styles.infoContainer} ${isSearching && styles.hidden}`}
      >
        <div className={styles.imageWrapper}>
          <a
            href="https://buymeacoffee.com/annehyeyeon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/amI.png?v=1"
              alt="내가...춘자였다니..."
              width={250}
              height={250}
              sizes="(max-width: 480px) 60vw, 250px"
              style={{ width: "100%", height: "auto" }}
              className={styles.image}
              priority
            />
          </a>
        </div>
        <p className={styles.infoText}>
          <strong>
            내 영어 이름이 미국에선 &lsquo;춘자&rsquo;일수도 있다고? 🙉
          </strong>
          <strong className={styles.secondLine}>
            내 이름의 유행 시기와 특징을 알아보아요 💃
          </strong>
        </p>
      </div>
      {isSearching && !errorMessage && (
        <ul className={styles.resultList}>
          {filteredNames.length > 0 ? (
            filteredNames.map((name) => (
              <li
                key={name.name}
                onClick={() => handleSearch(name)}
                className={styles.resultItem}
              >
                {name.name}
              </li>
            ))
          ) : (
            <li
              className={styles.resultItem}
              onClick={() => router.push(`/result/${query.trim()}`)}
            >
              &quot;{query.trim()}&quot;가 없다고요?
            </li>
          )}
        </ul>
      )}
      {!isSearching && (
        <>
          <div
            className={styles.updateNoteLink}
            onClick={() => router.push("/your-english-name")}
          >
            NEW : 영어 이름 추천 🚀
          </div>
          {/* <div
            className={styles.updateNoteLink}
            onClick={() => setShowUpdateBoard(!showUpdateBoard)}
          >
            💖 이름 업데이트 노트 보기
          </div> */}
          {showUpdateBoard && <UpdateBoard updates={updateData} />}
          <div
            className={styles.updateNoteLink}
            onClick={() => setShowNotice(true)}
          >
            여러분께 감사 인사 드립니다 💖
          </div>
        </>
      )}
      {showPopup && <ReportPopup onClose={() => setShowPopup(false)} />}
      {showNotice && (
        <NoticePopupWrapper onClose={() => setShowNotice(false)} />
      )}
    </div>
  );
}
