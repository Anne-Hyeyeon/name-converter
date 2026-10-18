export type Locale = "en";

export type Gender = "F" | "M";

export type GenerationKey =
  | "silentGen"
  | "boomer"
  | "genX"
  | "millennial"
  | "genZ"
  | "genAlpha"
  | "timeless"
  | "puppy"
  | "unique";

type GenerationText = {
  label: string;
  emoji: string;
  lines: string[];
};

export type Dictionary = {
  locale: Locale;
  htmlLang: string;
  siteName: string;
  withArticle: (label: string) => string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    resultTitle: (name: string, koreanName: string) => string;
    resultDescription: (name: string, koreanName: string, label: string) => string;
    notFoundTitle: (name: string) => string;
    notFoundDescription: (name: string) => string;
    bornTitle: (year: number) => string;
    bornDescription: (year: number) => string;
    bornIndexTitle: string;
    bornIndexDescription: string;
    checkTitle: (koreanName: string, romanized: string) => string;
    checkDescription: (romanized: string) => string;
  };
  header: {
    announcement: string;
    checkAnnouncement: string;
    link: string;
    homeLink: string;
    back: string;
    menu: { home: string; born: string; check: string; korean: string };
  };
  landing: {
    title: string;
    placeholder: string;
    tooLong: string;
    englishOnly: string;
    notListed: (query: string) => string;
    introStrong: string[];
    introSecond: string[];
    exampleLabel: string;
    heroEmojiLabel: string;
    bornLink: string;
    checkLink: string;
  };
  result: {
    lead: (name: string) => string;
    youWouldBe: string;
    labelSuffix: string;
    hear: string;
    relatedTitle: string;
    usTrend: (name: string, trendYear: string) => string;
    noMatch: string[];
    developerNote: string;
    share: string;
    copy: string;
    copied: string;
    copyFailed: (url: string) => string;
    save: string;
    saveFailed: string;
    back: string;
    support: string;
    shareText: (koreanName: string, romanized: string, label: string) => string;
  };
  born: {
    sectionTitle: string;
    sectionLede: string;
    yearLabel: string;
    yearPlaceholder: string;
    girl: string;
    boy: string;
    closest: (year: number) => string;
    seeAll: (year: number) => string;
    eyebrow: (year: number) => string;
    title: (year: number) => string;
    lede: (year: number) => string;
    indexEyebrow: string;
    indexTitle: string;
    indexLede: string;
    top3: string;
    topList: string;
    tapHint: string;
    rank: string;
    births: (count: number) => string;
    prev: (year: number) => string;
    next: (year: number) => string;
    allYears: string;
    decadeLink: (decade: number, year: number) => string;
    sourceOfficial: string;
    sourcePress: (source: string) => string;
    partialYear: string;
    indexSource: string;
  };
  check: {
    title: string;
    placeholder: string;
    button: string;
    examplesTitle: string;
    lede: string[];
    peak: (year: number) => string;
    peakRank: (year: number, rank: number, gender: string) => string;
    girls: string;
    boys: string;
    seenIn: string;
    fromSheet: string;
    notFound: (query: string) => string;
    didYouMean: string;
    tryOther: string;
    relatedTitle: (year: number) => string;
  };
  trend: {
    title: (romanized: string) => string;
    caption: (first: number, last: number) => string;
    chartLabel: (romanized: string, peakYear: number) => string;
    rare: string;
    peakYear: string;
    atLeast: (count: number) => string;
    total: (first: number, total: number) => string;
    source: string;
    olderUnknown: string;
  };
  celebrities: {
    title: (romanized: string) => string;
    caption: string;
    born: (year: number) => string;
    occupations: Record<string, string>;
    more: (count: number) => string;
    basedOn: string;
    source: string;
  };
  generations: Record<GenerationKey, GenerationText>;
};
