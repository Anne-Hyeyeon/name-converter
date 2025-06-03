"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isEnglishNamePage = pathname?.includes("/your-english-name");

  const handleMainClick = () => {
    router.push("/");
  };

  const handleEnglishNameClick = () => {
    router.push("/your-english-name");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.menuContainer}`)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {isEnglishNamePage ? (
          <div className={styles.announcement}>
            영어 이름 느낌 알아보기
            <br />
            <span className={styles.link} onClick={handleMainClick}>
              내가 춘자라니! 바로가기 ✨
            </span>
          </div>
        ) : (
          <div className={styles.announcement}>
            영어 이름 추천받기 서비스 오픈!
            <br />
            <span className={styles.link} onClick={handleEnglishNameClick}>
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
                handleMainClick();
                handleMenuClose();
              }}
            >
              내가 춘자라니
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                handleEnglishNameClick();
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
