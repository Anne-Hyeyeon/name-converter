export const KAKAO = {
  JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  SDK_URL: "https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js",
  SDK_INTEGRITY:
    "sha384-oroumrnFVE0xtgqyDZJARgERibXg2C28380uaUZz2kHDS5CR7tu20eGiOU6GkTpy",
  CARD_SIZE: { width: 800, height: 800 },
} as const;
