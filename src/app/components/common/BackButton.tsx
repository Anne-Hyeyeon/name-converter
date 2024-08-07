"use client";

import React from "react";
import Link from "next/link";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ href, children }) => {
  return (
    <Link href={href} className={styles.backButton}>
      {children}
    </Link>
  );
};

export default BackButton;
