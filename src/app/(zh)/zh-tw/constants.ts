export const ZH_URLS = {
  HOME: "/zh-tw",
  result: (name: string) => `/zh-tw/name/${encodeURIComponent(name)}`,
} as const;
