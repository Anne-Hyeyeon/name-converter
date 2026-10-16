"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { useNavigation } from "../../hooks";
import { URLS } from "../../constants/urls";

const CAROUSEL_INTERVAL = 4000;

export default function Header() {
  const { goToMain, goToEnglishName, goToTop100 } = useNavigation();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const isEnglishNamePage = pathname === "/your-english-name";
  const isMainPage = pathname === "/";
  const isResultPage = pathname.startsWith("/result/");
  const isTop100Page = pathname === "/top-baby-names-2025";

  // 메인/검색결과 페이지에서 두 가지 프로모를 캐러셀로 번갈아 노출
  const showCarousel = isMainPage || isResultPage;

  useEffect(() => {
    if (!showCarousel) return;
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % 2);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(id);
  }, [showCarousel]);

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

  const carouselSlides = [
    {
      key: "anne",
      text: "영어 이름 추천받기 서비스 오픈!",
      linkText: "내가 앤이라니? 바로가기 🎉",
      href: URLS.ENGLISH_NAME_PAGE,
    },
    {
      key: "top100",
      text: "🇺🇸 2025 미국 아기이름 Top 100!",
      linkText: "인기 이름 보러가기 ✨",
      href: URLS.TOP100_2025_PAGE,
    },
  ];

  let announcement: React.ReactNode;
  if (showCarousel) {
    const slide = carouselSlides[carouselIndex];
    announcement = (
      <div
        key={slide.key}
        className={`${styles.announcement} ${styles.carouselSlide}`}
      >
        {slide.text}
        <br />
        <Link href={slide.href} className={styles.link}>
          {slide.linkText}
        </Link>
      </div>
    );
  } else if (isTop100Page) {
    announcement = (
      <div className={styles.announcement}>
        🇺🇸 2025년 미국 아기이름 Top 100!
        <br />
        <Link href={URLS.MAIN_PAGE} className={styles.link}>
          내가 춘자라니? 바로가기 🎉
        </Link>
      </div>
    );
  } else if (isEnglishNamePage) {
    announcement = (
      <div className={styles.announcement}>
        영어 이름 느낌 알아보기
        <br />
        <Link href={URLS.MAIN_PAGE} className={styles.link}>
          내가 춘자라니! 바로가기 ✨
        </Link>
      </div>
    );
  } else {
    announcement = (
      <div className={styles.announcement}>
        영어 이름 느낌 알아보기
        <br />
        <Link href={URLS.MAIN_PAGE} className={styles.link}>
          내가 춘자라니? 바로가기 🎉
        </Link>
      </div>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>{announcement}</div>

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
            <button
              className={styles.dropdownItem}
              onClick={() => {
                goToTop100();
                handleMenuClose();
              }}
            >
              🇺🇸 2025 미국 아기이름 Top 100
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => {
                router.push(URLS.YEAR_PAGE);
                handleMenuClose();
              }}
            >
              📅 태어난 해 인기 이름
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
