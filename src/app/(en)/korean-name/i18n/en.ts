import type { Dictionary } from "./types";

const withArticle = (label: string) =>
  `${/^[AEIOU]/.test(label) && !label.startsWith("ONE") ? "an" : "a"} ${label}`;

export const en: Dictionary = {
  locale: "en",
  htmlLang: "en",
  siteName: "Am I Chunja?!",
  withArticle,
  meta: {
    title: "My Name in Korean: Hangul Spelling and Your Generation's Korean Name 🇰🇷",
    description:
      "Type your English name to see how it's written in Hangul and hear how it sounds. Then get the Korean name that was popular in your generation.",
    keywords:
      "my name in korean, name in hangul, how to write my name in korean, korean name, my korean name, korean name generator, what is my korean name, popular korean names by year",
    resultTitle: (name, hangul, koreanName) =>
      koreanName
        ? `${name} in Korean: ${hangul} | Korean Name ${koreanName}`
        : `${name} in Korean: ${hangul} | Hangul Spelling`,
    resultDescription: (name, hangul, koreanName, label) =>
      koreanName && label
        ? `${name} is written ${hangul} in Korean Hangul. If ${name} were Korean, the name would be ${koreanName}, ${withArticle(label)} name. Hear how it sounds.`
        : `${name} is written ${hangul} in Korean Hangul. Hear how it sounds and find your Korean name.`,
    notFoundTitle: (name) => `${name} - Am I Chunja?!`,
    notFoundDescription: (name) => `We couldn't find ${name} yet.`,
    bornTitle: (year) => `Popular Korean Names in ${year} - Am I Chunja?!`,
    bornDescription: (year) =>
      `The most popular Korean baby names for boys and girls born in ${year}. If you were born in Korea in ${year}, this might have been your name.`,
    bornIndexTitle: "Popular Korean Names by Birth Year - Am I Chunja?!",
    bornIndexDescription:
      "If you were born in Korea, what would your name be? See the most popular Korean names from 1945 to today.",
    checkTitle: (koreanName, romanized) =>
      `What does the name ${romanized} (${koreanName}) feel like in Korea? - Am I Chunja?!`,
    checkDescription: (romanized) =>
      `Want a Korean name inspired by your bias? See when ${romanized} was popular in Korea, which generation it belongs to, and which Korean stars share the same real name.`,
  },
  header: {
    announcement: "Your generation's Korean name 🇰🇷",
    checkAnnouncement: "How does my bias's name feel? 💜",
    link: "Find my Korean name ✨",
    homeLink: "Back to My Korean Name 🎉",
    back: "Back",
    menu: {
      home: "👵 My Korean name",
      born: "📅 Korean names by birth year",
      check: "💜 My bias's name",
      korean: "🇰🇷 한국어 사이트",
    },
  },
  landing: {
    title: "What's my Korean name? 🇰🇷",
    placeholder: "Your English name, e.g. Anne",
    tooLong: "That name is too long! 😅",
    englishOnly: "Please type your name in English letters only.",
    notListed: (query) => `Can't find "${query}"?`,
    introStrong: ["Type your English name,", "see it in Hangul and get your Korean name! ✨"],
    introSecond: [
      "Every English name has an era.",
      "We match it with a Korean name",
      "that was popular in that same era.",
    ],
    exampleLabel: "For example",
    heroEmojiLabel: "Chunja",
    bornLink: "📅 If I were born in Korea, what would my name be?",
    checkLink: "💜 What does my bias's name feel like?",
  },
  result: {
    spellingTitle: (name) => `${name} in Korean`,
    spellingLede: (name) => `This is how ${name} is written in Hangul, the Korean alphabet.`,
    lead: (name) => `If ${name} were Korean,`,
    youWouldBe: "you would be",
    labelSuffix: "name",
    hear: "🔊 Hear it",
    relatedTitle: "More English names from the same generation",
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
    save: "Save image",
    saveFailed: "Couldn't save the image. Please try again later. 😢",
    back: "Search another name →",
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
    tapHint: "Tap a name to see its name card, pronunciation, and generation.",
    rank: "Rank",
    births: (count) => `${count.toLocaleString("en-US")} babies`,
    prev: (year) => `‹ ${year}`,
    next: (year) => `${year} ›`,
    allYears: "All years",
    decadeLink: (decade, year) => `See popular names (${year} data) →`,
    sourceOfficial:
      "Source: Supreme Court of Korea, birth registration statistics (provisional, as of Oct 2026).",
    sourcePress: (source) =>
      `Source: ${source}. Older years only have yearly snapshots reported in the news.`,
    partialYear: "Based on births registered from January to August.",
    indexSource:
      "Sources: Supreme Court of Korea birth registration statistics (2008 onward) and Korean news reports of Supreme Court data (before 2008).",
  },
  check: {
    title: "What does my bias's name feel like? 💜",
    placeholder: "Your bias's name, e.g. Jimin or 지민",
    button: "Check",
    examplesTitle: "Popular bias names to try",
    lede: [
      "Want a Korean name inspired by your bias (최애)?",
      "Type their Korean name in English letters or Hangul.",
      "See which generation it belongs to, when it was popular, and which stars share it.",
    ],
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
    relatedTitle: (year) => `Other popular Korean names around ${year}`,
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
      intro: "A 1920s and 30s name. 🕰️",
      fun: [
        "Born before TV, raised on radio dramas. A true classic. 📻",
        "Back when letters took weeks and every word counted. ✉️",
        "This name has seen trams, typewriters, and a whole century. 🚋",
        "Old-school charm that never needed Wi-Fi. 🎩",
        "The kind of name you'd find in a black-and-white family photo. 📷",
        "A name with stories older than your grandparents' wedding album. 📜",
      ],
    },
    boomer: {
      label: "BOOMER",
      emoji: "✌️",
      intro: "Korean parents loved this name in the 1940s and 50s. ✌️",
      fun: [
        "The generation that built modern Korea from the ground up. 🏗️",
        "Think postwar grit, packed buses, and endless hard work. 🚌",
        "Raised on radio, now ruling the family group chat. 📱",
        "The ones who turned a country around in a single lifetime. 🌏",
        "Trot music fans before trot was cool again. 🎶",
        "They walked to school uphill both ways, and they'll tell you about it. 🥾",
      ],
    },
    genX: {
      label: "GEN X",
      emoji: "📼",
      intro: "A 1960s and 70s name. 📼",
      fun: [
        "Cassette tapes, arcade games, and the first Korean TV dramas. 🕹️",
        "Grew up with mixtapes and dial phones, now masters of the office dinner. 🍻",
        "The first generation to blast pop songs on a Walkman. 🎧",
        "Watched the 1988 Seoul Olympics and still remembers Hodori the tiger. 🐯",
        "Pagers in their pockets and big dreams in their hearts. 📟",
        "The original K-drama fans, one episode a week, no skipping. 📺",
      ],
    },
    millennial: {
      label: "MILLENNIAL",
      emoji: "💿",
      intro: "A 1980s and 90s name. 💿",
      fun: [
        "The generation that grew up with the first wave of K-pop and PC bangs. 🎮",
        "Cyworld profiles, flip phones, and karaoke till midnight. 📱",
        "Lived through dial-up internet and the very first K-pop fandoms. 🌐",
        "StarCraft at the PC bang after school, every single day. 🖱️",
        "Collected idol photo cards before it was a whole economy. 🃏",
        "Studied for exams by day, ran fan cafés by night. ✏️",
      ],
    },
    genZ: {
      label: "GEN Z",
      emoji: "📱",
      intro: "A 2000s name. 📱",
      fun: [
        "Same generation as today's K-pop idols. 🎤",
        "Grew up with smartphones while K-pop went global. 🌍",
        "Speaks fluent emoji and learned every dance from YouTube. 💃",
        "Watched K-pop take over the world in real time. 🚀",
        "Born online, from mukbang videos to idol livestreams. 📹",
        "Their class group chat had more members than most idol groups. 💬",
      ],
    },
    genAlpha: {
      label: "GEN ALPHA",
      emoji: "👶",
      intro: "Korean parents are choosing this name right now. 👶",
      fun: [
        "The newest generation in Korea. 🍼",
        "Can swipe a tablet before they can tie their shoes. 📲",
        "Their first favorite song was probably a baby shark remix. 🦈",
        "Growing up with AI speakers that answer every single 'why?'. 🤖",
        "The future K-pop trainees of the 2030s. ⭐",
        "Born into a world where K-content is everywhere. 🌐",
      ],
    },
    timeless: {
      label: "TIMELESS",
      emoji: "✨",
      intro: "Loved in the past and still loved today.",
      fun: [
        "Classic and trendy at the same time! 🤩",
        "Never out of style, like a crisp white T-shirt. 👕",
        "Grandparents and Gen Z both approve of this one. 🤝",
      ],
    },
    puppy: {
      label: "PUPPY",
      emoji: "🐶",
      intro: "Plot twist: in Korea this sounds like a puppy's name.",
      fun: [
        "Cute, though! 🐕",
        "Don't be surprised if someone turns around at the dog park. 🐾",
        "Honestly, a very good name for a very good friend. 🦴",
      ],
    },
    unique: {
      label: "ONE-OF-A-KIND",
      emoji: "🌍",
      intro: "Your name comes from outside the American mainstream.",
      fun: [
        "So here's a Korean name with a similar feel. ✨",
        "A rare find, just like you. 💎",
        "One of a kind in any language. 🌈",
      ],
    },
  },
};
