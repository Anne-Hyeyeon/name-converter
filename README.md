# 내가 춘자라니 🙉! (Am I Chunja?!)

## 사용된 기술

`TypeScript`, `Next.js`, `Google Sheets API`, `CSS Modules`,

## 프로젝트 소개

- 사용자의 영어 이름이 미국에서 어떤 느낌인지 알려주는 재미있는 🤩 웹 서비스입니다.
- **새로운 기능**: 성별, 세대, 성격에 맞는 개인화된 영어 이름 추천 서비스가 추가되었습니다! 🚀
- Next.js의 정적 사이트 생성(SSG) 기능을 활용하여 빠른 로딩 속도와 효율적인 리소스 사용을 구현했습니다.

## 주요 기능

1. **영어 이름 검색**: 내 영어 이름이 촌스러운지 트렌디한지 확인
2. **이름 추천**: 성별, 세대, 성격 특성을 기반으로 한 맞춤형 영어 이름 추천

## 주의사항

- 이 프로젝트는 특정 서버 환경에 종속된 SSG(Static Site Generation) 서비스입니다.
- 환경 변수와 데이터가 특정 서버에 설정되어 있어, 로컬 환경에서의 완전한 실행이 불가능할 수 있습니다! 🥲

## 리팩토링/업데이트 완료 ✅

- [x] 업데이트 노트 DB 통합: 하나의 JSON 파일로 관리 변경
- [x] 업데이트 노트 페이지네이션 추가
- [x] 기부 요청 문구 수정
- [x] 한국 이름 -> 영어 이름 추천 기능 구현
- [x] 코드 리팩토링: 컴포넌트 분리, 유틸 함수 추출, 상수 분리

## 향후 업데이트 예정 🔮

- [ ] 재미로 보는 영어 이름 궁합
- [ ] 이름 히스토리 저장 기능
- [ ] 다국어 지원 (English)

## 프로젝트 구조

```
src/app/
├─ (shared)/                          # Route Group for shared resources
│  ├─ components/
│  │  ├─ english-name/
│  │  │  ├─ EnglishNameComponent.tsx
│  │  │  ├─ EnglishNameResult.tsx
│  │  │  └─ NameRecommendSelector.tsx
│  │  ├─ layout/
│  │  │  ├─ Footer.tsx
│  │  │  └─ Header.tsx
│  │  ├─ modals/
│  │  │  ├─ NameUpdateModal.tsx
│  │  │  ├─ NoticePopup.tsx
│  │  │  └─ ReportPopup.tsx
│  │  ├─ scripts/
│  │  │  ├─ GoogleAdSenseScript.tsx
│  │  │  └─ GoogleAnalyticsScript.tsx
│  │  ├─ search/
│  │  │  ├─ NameNotFound.tsx
│  │  │  ├─ SearchComponent.tsx
│  │  │  └─ SearchResult.tsx
│  │  ├─ UpdateBoard.tsx
│  │  └─ UpdateBoard.module.css
│  ├─ constants/
│  │  ├─ characteristicComments.ts
│  │  ├─ recommendOptions.ts
│  │  ├─ resultMessages.ts
│  │  ├─ urls.ts
│  │  └─ index.ts
│  ├─ data/
│  │  └─ updates.json
│  ├─ hooks/
│  │  ├─ useImageCapture.ts
│  │  ├─ useNavigation.ts
│  │  └─ index.ts
│  ├─ types/
│  │  └─ index.ts
│  └─ utils/
│     ├─ englishNameUtils.ts
│     ├─ getAllNameData.ts
│     ├─ snakeToCamel.ts
│     └─ index.ts
├─ api/
│  └─ sheets/
│     └─ route.ts
├─ result/
│  └─ [name]/
│     ├─ page.tsx
│     └─ page.module.css
├─ your-english-name/
│  ├─ layout.tsx
│  └─ page.tsx
├─ Error.tsx
├─ Loading.tsx
├─ globals.css
├─ layout.module.css
├─ layout.tsx
└─ page.tsx
```
