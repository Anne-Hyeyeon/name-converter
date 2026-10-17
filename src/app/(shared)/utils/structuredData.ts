import { URLS } from "../constants/urls";

const absolute = (path: string) => `${URLS.SITE}${path}`;

export const websiteJsonLd = ({
  name,
  alternateName,
  path,
  language,
  description,
}: {
  name: string;
  alternateName: string;
  path: string;
  language: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  alternateName,
  url: absolute(path),
  inLanguage: language,
  description,
});

/**
 * 홈부터 현재 페이지까지의 경로를 BreadcrumbList 로 만듭니다.
 */
export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

/**
 * 순위 목록을 ItemList 로 만듭니다.
 */
export const itemListJsonLd = (
  name: string,
  items: { name: string; path?: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    ...(item.path && { url: absolute(item.path) }),
  })),
});
