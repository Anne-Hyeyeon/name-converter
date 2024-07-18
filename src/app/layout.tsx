import "./globals.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={styles.body}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
