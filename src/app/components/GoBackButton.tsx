"use client";

import { useRouter } from "next/navigation";
import styles from "./GoBackButton.module.css"; // 필요하다면 별도의 스타일 파일 생성

export default function GoBackButton() {
 const router = useRouter();

 return (
  <button className={styles.button} onClick={() => router.push("/")}>
   Go back to Search
  </button>
 );
}
