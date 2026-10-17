const INITIALS = [
  "g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s",
  "ss", "", "j", "jj", "ch", "k", "t", "p", "h",
];

const MEDIALS = [
  "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae",
  "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i",
];

const FINALS = [
  "", "k", "k", "k", "n", "n", "n", "t", "l", "k", "m", "l", "l", "l",
  "p", "l", "m", "p", "p", "t", "t", "ng", "t", "t", "k", "t", "p", "t",
];

const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;

const romanizeSyllable = (char: string): string => {
  const code = char.charCodeAt(0);
  if (code < HANGUL_START || code > HANGUL_END) return char;
  const index = code - HANGUL_START;
  const initial = Math.floor(index / 588);
  const medial = Math.floor((index % 588) / 28);
  const final = index % 28;
  return INITIALS[initial] + MEDIALS[medial] + FINALS[final];
};

/**
 * 한글 이름을 국어의 로마자 표기법에 맞춰 음절마다 하이픈으로 이어 씁니다.
 */
export const romanizeName = (hangul: string): string => {
  const syllables = [...hangul].map(romanizeSyllable);
  const joined = syllables.join("-");
  return joined.charAt(0).toUpperCase() + joined.slice(1);
};

/**
 * 한글 이름을 주소에 쓰는 소문자 로마자로 바꿉니다.
 */
export const romanizeSlug = (hangul: string): string =>
  [...hangul].map(romanizeSyllable).join("").toLowerCase();

/**
 * 사용자가 입력한 로마자 이름을 비교용 문자열로 바꿉니다.
 */
export const normalizeRomanized = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/oo/g, "u")
    .replace(/ee/g, "i");

export const isHangul = (input: string): boolean =>
  /^[가-힣]+$/.test(input);

const SURNAMES: Record<string, string> = {
  남궁: "Namgung", 선우: "Sunwoo", 독고: "Dokgo", 황보: "Hwangbo", 제갈: "Jegal",
  사공: "Sagong", 서문: "Seomun", 동방: "Dongbang",
  김: "Kim", 이: "Lee", 박: "Park", 최: "Choi", 정: "Jung", 강: "Kang", 조: "Cho",
  윤: "Yoon", 장: "Jang", 임: "Lim", 한: "Han", 오: "Oh", 서: "Seo", 신: "Shin",
  권: "Kwon", 황: "Hwang", 안: "Ahn", 송: "Song", 류: "Ryu", 유: "Yoo", 전: "Jeon",
  홍: "Hong", 고: "Ko", 문: "Moon", 양: "Yang", 손: "Son", 배: "Bae", 백: "Baek",
  허: "Heo", 남: "Nam", 심: "Shim", 노: "Noh", 하: "Ha", 곽: "Kwak", 성: "Sung",
  차: "Cha", 주: "Joo", 우: "Woo", 구: "Koo", 민: "Min", 진: "Jin", 나: "Na",
  지: "Ji", 엄: "Eom", 채: "Chae", 원: "Won", 천: "Cheon", 방: "Bang", 공: "Gong",
  현: "Hyun", 함: "Ham", 변: "Byun", 염: "Yeom", 여: "Yeo", 추: "Choo", 도: "Do",
  소: "So", 석: "Seok", 선: "Sun", 설: "Seol", 마: "Ma", 길: "Gil", 연: "Yeon",
  위: "Wi", 표: "Pyo", 명: "Myung", 기: "Ki", 반: "Ban", 왕: "Wang", 금: "Geum",
  옥: "Ok", 육: "Yook", 인: "In", 맹: "Maeng", 제: "Je", 모: "Mo", 탁: "Tak",
  국: "Kook", 봉: "Bong", 어: "Eo", 은: "Eun", 편: "Pyeon", 용: "Yong", 예: "Ye",
  경: "Kyung", 사: "Sa", 부: "Boo",
};

/**
 * 성과 이름이 붙은 한글 본명을 "Kim Tae-hyung" 처럼 씁니다. 성은 관용 표기를 따릅니다.
 */
export const romanizeFullName = (fullName: string, givenName: string): string => {
  const surname = fullName.slice(0, fullName.length - givenName.length);
  return `${SURNAMES[surname] ?? romanizeName(surname)} ${romanizeName(givenName)}`;
};
