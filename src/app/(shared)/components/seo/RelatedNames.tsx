import Link from "next/link";
import styles from "./RelatedNames.module.css";

export type RelatedName = { href: string; label: string; sub?: string };

export default function RelatedNames({
  title,
  names,
}: {
  title: string;
  names: RelatedName[];
}) {
  if (names.length === 0) return null;
  return (
    <section className={styles.related} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {names.map((name) => (
          <li key={name.href}>
            <Link href={name.href} className={styles.chip}>
              <span className={styles.label}>{name.label}</span>
              {name.sub && <span className={styles.sub}>{name.sub}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
