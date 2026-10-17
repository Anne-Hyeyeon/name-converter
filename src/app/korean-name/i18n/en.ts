import type { Dictionary } from "./types";

const withArticle = (label: string) =>
  `${/^[AEIOU]/.test(label) && !label.startsWith("ONE") ? "an" : "a"} ${label}`;

export const en: Dictionary = {
  locale: "en",
  htmlLang: "en",
  siteName: "Am I Chunja?!",
  withArticle,
  meta: {
    title: "What's My Korean Name? Find the Korean Name From Your Generation 🇰🇷",
    description:
      "Every English name has a generation. Type yours and get the Korean name that was popular in the same era, with Hangul and how to say it.",
    keywords:
      "korean name, my korean name, korean name generator, what is my korean name, korean name from my generation, popular korean names by year, korean baby names",
    resultTitle: (name, koreanName) =>
      `${name} in Korea is ${koreanName} - Am I Chunja?!`,
    resultDescription: (name, koreanName, label) =>
      `${name} would be ${koreanName} in Korea. That's ${withArticle(label)} name! Find out what your English name sounds like in Korea.`,
    notFoundTitle: (name) => `${name} - Am I Chunja?!`,
    notFoundDescription: (name) => `We couldn't find ${name} yet.`,
    bornTitle: (year) => `Popular Korean Names in ${year} - Am I Chunja?!`,
    bornDescription: (year) =>
      `The most popular Korean baby names for boys and girls born in ${year}. If you were born in Korea in ${year}, this might have been your name.`,
    bornIndexTitle: "Popular Korean Names by Birth Year - Am I Chunja?!",
    bornIndexDescription:
      "If you were born in Korea, what would your name be? See the most popular Korean names from 1945 to today.",
    checkTitle: (koreanName, romanized) =>
      `${romanized} (${koreanName}): Which generation is this Korean name? - Am I Chunja?!`,
    checkDescription: (romanized) =>
      `When was ${romanized} popular in Korea? Find out which generation your favorite Korean name belongs to.`,
  },
  header: {
    announcement: "Your generation's Korean name 🇰🇷",
    checkAnnouncement: "Which generation is this name? 🔍",
    link: "Find my Korean name ✨",
    homeLink: "Back to My Korean Name 🎉",
    back: "‹ Back",
    menu: {
      home: "👵 My Korean name",
      born: "📅 Korean names by birth year",
      check: "🔍 Check a Korean name",
      korean: "🇰🇷 한국어 사이트",
    },
  },
  landing: {
    title: "What's my Korean name? 🇰🇷",
    placeholder: "Your English name, e.g. Anne",
    tooLong: "That name is too long! 😅",
    englishOnly: "Please type your name in English letters only.",
    notListed: (query) => `Can't find "${query}"?`,
    introStrong: "Your Korean name, matched to your generation. 🇰🇷",
    introSecond: [
      "Every English name has an era.",
      "We find the Korean name that was popular in that same era.",
    ],
    exampleLabel: "For example",
    heroEmojiLabel: "Chunja",
    bornLink: "📅 If I were born in Korea, what would my name be?",
    checkLink: "🔍 Which generation is my favorite Korean name?",
  },
  result: {
    lead: (name) => `If ${name} were Korean,`,
    youWouldBe: "you would be",
    labelSuffix: "name",
    hear: "🔊 Hear it",
    usTrend: (name, trendYear) =>
      `In the US, ${name} was most popular around ${trendYear}.`,
    noMatch: [
      "We can't match this name with a Korean name yet.",
      "But many people searched it, so we kept it here.",
    ],
    developerNote: "This is the developer's name... psst.",
    share: "Share my result",
    copy: "Copy link",
    copied: "Link copied ✓",
    copyFailed: (url) => `Couldn't copy the link. Please copy it yourself:\n${url}`,
    save: "Save as image",
    saveFailed: "Couldn't save the image. Please try again later. 😢",
    back: "Search another name",
    support: "☕️ Support the developer",
    shareText: (koreanName, romanized, label) =>
      `My Korean name is ${koreanName} (${romanized}). It's ${withArticle(label)} name! What's yours?`,
  },
  born: {
    sectionTitle: "Born in Korea? 🇰🇷",
    sectionLede:
      "Pick your birth year. These were the most popular names for Korean babies that year.",
    yearLabel: "Birth year",
    yearPlaceholder: "Select year",
    girl: "Girl",
    boy: "Boy",
    closest: (year) => `We don't have data for every year, so this is the closest one: ${year}.`,
    seeAll: (year) => `See all popular names in ${year} →`,
    eyebrow: (year) => `KOREAN BABY NAMES · ${year}`,
    title: (year) => `Popular Korean names in ${year}.`,
    lede: (year) =>
      `If you were born in Korea in ${year}, your classmates were probably called these names. 👀`,
    indexEyebrow: "KOREAN BABY NAMES",
    indexTitle: "If I were born in Korea, what would my name be?",
    indexLede:
      "Pick a year. We collected the most popular Korean baby names from 1945 to today.",
    top3: "Top 3",
    topList: "Top 10",
    rank: "Rank",
    births: (count) => `${count.toLocaleString("en-US")} babies`,
    prev: (year) => `‹ ${year}`,
    next: (year) => `${year} ›`,
    allYears: "All years",
    sourceOfficial:
      "Source: Supreme Court of Korea, birth registration statistics (provisional, as of Oct 2026).",
    sourcePress: (source) =>
      `Source: ${source}. Older years only have yearly snapshots reported in the news.`,
    partialYear: "Based on births registered from January to August.",
    indexSource:
      "Sources: Supreme Court of Korea birth registration statistics (2008 onward) and Korean news reports of Supreme Court data (before 2008).",
  },
  check: {
    title: "Which generation is my favorite Korean name? 🔍",
    placeholder: "Korean name, e.g. Jimin or 지민",
    button: "Check",
    lede: "Type a Korean name in English letters or in Hangul.",
    peak: (year) => `Most popular in Korea around ${year}.`,
    peakRank: (year, rank, gender) =>
      `In ${year}, it was the #${rank} name for Korean ${gender}.`,
    girls: "girls",
    boys: "boys",
    seenIn: "Years in the top 10",
    fromSheet: "We matched this name with these English names:",
    notFound: (query) => `We couldn't find "${query}" yet.`,
    didYouMean: "Did you mean",
    tryOther: "Try another Korean name",
  },
  trend: {
    title: (romanized) => `📈 Korean babies named ${romanized}`,
    caption: (first, last) => `Babies born per year (${first}-${last})`,
    chartLabel: (romanized, peakYear) =>
      `Babies named ${romanized} per year in Korea, highest in ${peakYear}`,
    rare: "Not many Korean babies got this name after 2008.",
    peakYear: "Most babies born in",
    atLeast: (count) => `at least ${count.toLocaleString("en-US")} babies`,
    total: (first, total) =>
      `Since ${first}: at least ${total.toLocaleString("en-US")} babies`,
    source:
      "Source: Supreme Court of Korea birth registration statistics. We added up the top 20 names of each region, so real numbers are higher.",
    olderUnknown:
      "This name was rare for babies born after 2008. It may have been popular earlier, but we don't have data for every older year yet.",
  },
  celebrities: {
    title: (romanized) => `⭐ Famous Koreans named ${romanized}`,
    caption: "Singers and actors whose real name has the same given name.",
    born: (year) => `born ${year}`,
    occupations: { singer: "Singer", rapper: "Rapper", actor: "Actor", model: "Model" },
    more: (count) => `and ${count.toLocaleString("en-US")} more`,
    basedOn:
      "We estimated this from the birth years of famous Koreans with this name.",
    source: "Source: Wikidata. Real names only, no stage names.",
  },
  generations: {
    silentGen: {
      label: "SILENT GEN",
      emoji: "🕰️",
      lines: [
        "A 1920s and 30s name. 🕰️",
        "Born before TV, raised on radio dramas. A true classic.",
      ],
    },
    boomer: {
      label: "BOOMER",
      emoji: "✌️",
      lines: [
        "Korean parents loved this name in the 1940s and 50s. ✌️",
        "The generation that built modern Korea from the ground up.",
      ],
    },
    genX: {
      label: "GEN X",
      emoji: "📼",
      lines: [
        "A 1960s and 70s name. 📼",
        "Cassette tapes, arcade games, and the first Korean TV dramas.",
      ],
    },
    millennial: {
      label: "MILLENNIAL",
      emoji: "💿",
      lines: [
        "A 1980s and 90s name. 💿",
        "The generation that grew up with the first wave of K-pop and PC bangs. 🎮",
      ],
    },
    genZ: {
      label: "GEN Z",
      emoji: "📱",
      lines: [
        "A 2000s name. 📱",
        "Same generation as today's K-pop idols.",
      ],
    },
    genAlpha: {
      label: "GEN ALPHA",
      emoji: "👶",
      lines: [
        "Korean parents are choosing this name right now.",
        "The newest generation in Korea. 🍼",
      ],
    },
    timeless: {
      label: "TIMELESS",
      emoji: "✨",
      lines: [
        "Loved in the past and still loved today.",
        "Classic and trendy at the same time! 🤩",
      ],
    },
    puppy: {
      label: "PUPPY",
      emoji: "🐶",
      lines: [
        "Plot twist: in Korea this sounds like a puppy's name.",
        "Cute, though! 🐕",
      ],
    },
    unique: {
      label: "ONE-OF-A-KIND",
      emoji: "🌍",
      lines: [
        "Your name comes from outside the American mainstream.",
        "So here's a Korean name with a similar feel. ✨",
      ],
    },
  },
};
