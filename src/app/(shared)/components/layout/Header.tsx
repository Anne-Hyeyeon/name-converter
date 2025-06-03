"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { useNavigation } from "../../hooks";

export default function Header() {
  const { goToMain, goToEnglishName } = useNavigation();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isEnglishNamePage = pathname === "/your-english-name";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuContainer = document.querySelector(`.${styles.menuContainer}`);
      if (menuContainer && !menuContainer.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {isEnglishNamePage ? (
          <div className={styles.announcement}>
            영어 이름 느낌 알아보기
            <br />
            <span className={styles.link} onClick={goToMain}>
              내가 춘자라니! 바로가기 ✨
            </span>
          </div>
        ) : (
          <div className={styles.announcement}>
            영어 이름 추천받기 서비스 오픈!
            <br />
            <span className={styles.link} onClick={goToEnglishName}>
              내가 앤이라니? 바로가기 🎉
            </span>
          </div>
        )}
      </div>

      <div className={styles.menuContainer}>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <div className={styles.menuIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {isMenuOpen && (
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                goToMain();
                handleMenuClose();
              }}
            >
              내가 춘자라니
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                goToEnglishName();
                handleMenuClose();
              }}
            >
              내가 앤이라니
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
