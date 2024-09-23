# 내가 춘자라니 🙉! (Am I Chunja?!)

## 사용된 기술

`TypeScript`, `Next.js`, `Google Sheets API`

## 프로젝트 소개

- 사용자의 이름이 미국에서 어떤 느낌인지 알려주는 재미있는 🤩 웹 서비스입니다.
- Next.js의 정적 사이트 생성(SSG) 기능을 활용하여 빠른 로딩 속도와 효율적인 리소스 사용을 구현했습니다.

## 주의사항

- 이 프로젝트는 특정 서버 환경에 종속된 SSG(Static Site Generation) 서비스입니다.
- 환경 변수와 데이터가 특정 서버에 설정되어 있어, 로컬 환경에서의 완전한 실행이 불가능할 수 있습니다! 🥲


## 리팩토링/업데이트 예정

~~- 업데이트 노트 DB 추가 []~~ 
- [x] 변경 : 업데이트 파일을 통합해 하나의 JSON 파일로 관리.
- [x] 업데이트 노트 페이지네이션 추가 
- [ ] 기부 요청 문구 수정 
- [ ] 한국 이름 -> 영어 이름 
- [ ] 재미로 보는 영어 이름 궁합 

```
name-converter
├─ .eslintrc.json
├─ lib
│  └─ google-sheets-api.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ public
│  ├─ ads.txt
│  ├─ amI.png
│  ├─ favicon-16x16.png
│  └─ favicon.ico
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ ads.txt
│  ├─ amI.png
│  ├─ favicon-16x16.png
│  └─ favicon.ico
├─ src
│  └─ app
│     ├─ Error.tsx
│     ├─ Loading.tsx
│     ├─ api
│     │  ├─ sheets
│     │  │  └─ route.ts
│     │  └─ updatenote
│     ├─ components
│     │  ├─ UpdateBoard.module.css
│     │  ├─ UpdateBoard.tsx
│     │  ├─ common
│     │  │  ├─ BackButton.module.css
│     │  │  ├─ BackButton.tsx
│     │  │  └─ CoopangBanner.tsx
│     │  ├─ layout
│     │  │  ├─ Footer.module.css
│     │  │  └─ Footer.tsx
│     │  ├─ modals
│     │  │  ├─ NameUpdateModal.module.css
│     │  │  ├─ NameUpdateModal.tsx
│     │  │  ├─ NoticePopup.module.css
│     │  │  ├─ NoticePopup.tsx
│     │  │  ├─ NoticePopupWrapper.module.css
│     │  │  ├─ NoticePopupWrapper.tsx
│     │  │  ├─ ReportPopup.module.css
│     │  │  └─ ReportPopup.tsx
│     │  ├─ scripts
│     │  │  ├─ AdropScript.tsx
│     │  │  └─ GoogleAnalyticsScript.tsx
│     │  └─ search
│     │     ├─ NameNotFound.module.css
│     │     ├─ NameNotFound.tsx
│     │     ├─ ResultContent.tsx
│     │     ├─ SearchComponent.module.css
│     │     ├─ SearchComponent.tsx
│     │     ├─ SearchResult.module.css
│     │     └─ SearchResult.tsx
│     ├─ constants
│     │  └─ resultMessages.ts
│     ├─ data
│     │  ├─ 20240729.ts
│     │  ├─ 20240730.ts
│     │  ├─ 20240804.ts
│     │  ├─ 20240820.ts
│     │  ├─ 20240829.ts
│     │  └─ 20240924.ts
│     ├─ globals.css
│     ├─ layout.module.css
│     ├─ layout.tsx
│     ├─ page.tsx
│     ├─ result
│     │  └─ [name]
│     │     ├─ page.module.css
│     │     └─ page.tsx
│     ├─ types
│     │  └─ index.ts
│     └─ utils
│        ├─ getAllNameData.ts
│        ├─ getAllUpdateData.ts
│        └─ snakeToCamel.ts
└─ tsconfig.json

```

