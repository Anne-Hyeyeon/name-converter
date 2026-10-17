export const KOREAN_NAME_URLS = {
  HOME: "/korean-name",
  BORN: "/korean-name/born",
  CHECK: "/korean-name/check",
  result: (name: string) => `/korean-name/${encodeURIComponent(name)}`,
  born: (year: number) => `/korean-name/born/${year}`,
  check: (slug: string) => `/korean-name/check/${encodeURIComponent(slug)}`,
} as const;
