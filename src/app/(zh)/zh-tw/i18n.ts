import type { NameTrendText } from "@/app/(shared)/components/search/NameTrend";

export const zh = {
  htmlLang: "zh-Hant-TW",
  siteName: "原來我是淑芬？！",
  meta: {
    title: "原來我是淑芬？！你的英文名字在美國是幾年代的名字？",
    description:
      "以為自己的英文名字很洋氣？輸入英文名字，看看它在美國是幾年代流行的名字，就像台灣的哪個名字。資料來自美國社會安全局與內政部全國姓名統計。",
    keywords:
      "英文名字, 英文名 老氣, 英文名字 年代, 菜市場名, 英文名 推薦, 英文名字查詢, 原來我是淑芬",
    resultTitle: (name: string, twName: string) =>
      `${name} 在美國就像台灣的「${twName}」？英文名字年代查詢 - 原來我是淑芬？！`,
    resultDescription: (name: string, trendYear: string, twName: string) =>
      `${name} 是美國 ${trendYear} 年代流行的英文名字，就像台灣的「${twName}」。查查你的英文名字在美國是幾年代的名字。`,
    plainTitle: (name: string) => `${name} 英文名字年代查詢 - 原來我是淑芬？！`,
    notFoundTitle: (name: string) => `找不到 ${name} - 原來我是淑芬？！`,
  },
  header: {
    announcement: "你的英文名字在美國是幾年代？🇺🇸",
    link: "原來我是淑芬？！首頁 ✨",
    menu: { home: "🔍 英文名字年代查詢", korean: "🇰🇷 한국어", english: "🌏 English" },
  },
  landing: {
    title: "你的英文名字，在美國是幾年代？🇺🇸",
    placeholder: "輸入英文名字，例如 Jennifer",
    tooLong: "名字太長了！😅",
    englishOnly: "請只輸入英文字母。",
    notListed: (query: string) => `找不到「${query}」？`,
    pitch: ["以為自己的英文名字很洋氣？", "在美國，它可能就像台灣的「淑芬」！"],
    lede: [
      "每個名字都有自己的流行年代。",
      "我們用美國出生統計找出你的英文名字流行的年代，",
      "再配上同一個年代台灣最常見的名字。",
    ],
    exampleLabel: "例如",
  },
  result: {
    lead: (name: string) => `${name} 在美國是`,
    era: (trendYear: string) => `${trendYear} 年代流行的名字`,
    likeTaiwan: "就像台灣的",
    twNote: (from: number, to: number, gender: "F" | "M") =>
      `（${from}–${to} 年出生的台灣${gender === "F" ? "女生" : "男生"}最常見的名字之一）`,
    sameEraTitle: (from: number, to: number) => `${from}–${to} 年台灣常見名字`,
    noMatch: ["這個名字的資料不足，", "暫時無法配對台灣的名字 🙏"],
    developerNote: "這是開發者的英文名字……噓。",
    top100: (name: string) => `${name} 是 2025 年美國新生兒熱門名字前 100 名！`,
    doggy: (name: string) => `${name} 在美國也常被拿來當狗狗的名字！🐶`,
    share: "分享結果",
    copy: "複製連結",
    copied: "已複製連結 ✓",
    copyFailed: (url: string) => `無法複製連結，請手動複製：\n${url}`,
    back: "再查一個名字 →",
    relatedTitle: "同年代在美國流行的英文名字",
    shareText: (name: string, twName: string) =>
      `原來我的英文名字 ${name} 在美國就像台灣的「${twName}」😂 你的呢？`,
    source:
      "資料來源：美國社會安全局（SSA）出生名字統計、內政部《全國姓名統計分析》（112年6月30日）。台灣名字為該年代出生且目前仍在戶籍的人數排名。",
  },
  generations: {
    1: { label: "經典老派", emoji: "🕰️", lines: ["這是美國 20 世紀初流行的名字！", "你是坐時光機來的嗎？🕰️"] },
    2: { label: "嬰兒潮世代", emoji: "✌️", lines: ["這是美國嬰兒潮世代的名字！", "Peace ✌️ 滿滿的嬉皮風！"] },
    3: { label: "X 世代", emoji: "📼", lines: ["這是美國 X 世代常見的名字！", "錄音帶和隨身聽的浪漫年代 📼"] },
    4: { label: "千禧世代", emoji: "💿", lines: ["這是美國千禧世代的名字！", "80、90 年代出生的話，這名字超搭！🕺"] },
    5: { label: "Z 世代", emoji: "📱", lines: ["美國媽媽們最近很愛的 Z 世代名字！", "IG 限動感滿滿 📱"] },
    6: { label: "經典不敗", emoji: "✨", lines: ["從以前到現在都很受歡迎，", "經典又不退流行！🤩"] },
    7: { label: "狗狗名", emoji: "🐶", lines: ["這個名字在美國更常被當成狗狗的名字 🐶", "讓給可愛的狗狗吧！"] },
    8: { label: "獨特", emoji: "🌍", lines: ["這個名字不是源自美國，", "帶有歐洲或非洲等地的文化背景 🌍"] },
    9: { label: "獨特", emoji: "🌏", lines: ["這個名字很可能是亞洲人依本名取的英文名，", "保留原本的意義也很棒 ✨"] },
  } as Record<number, { label: string; emoji: string; lines: string[] }>,
  footer: {
    label: "網站選單",
    home: "原來我是淑芬？！",
  },
};

export const zhTrendText: NameTrendText = {
  title: (name) => `📈 在美國出生的 ${name}`,
  caption: (first, last) => `每年出生人數（${first}-${last}）`,
  rare: "這個名字在美國也非常少見。",
  chartLabel: (name, peakYear) => `${name} 每年在美國的出生人數，${peakYear} 年最多`,
  peakYear: "出生最多的年份：",
  peakYearValue: (year) => `${year} 年`,
  peakCount: (count) => `${count.toLocaleString("zh-TW")} 人`,
  latestRank: (year) => `${year} 年排名：`,
  latestRankValue: (rank) => `第 ${rank.toLocaleString("zh-TW")} 名`,
  notRanked: (year) => `${year} 年出生人數少於 5 人`,
  revival: "🔁 老名字最近又流行起來了！",
  source: "資料來源：美國社會安全局（SSA）",
  yearHref: null,
};
