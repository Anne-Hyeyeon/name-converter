# 내가 춘자라니 🙉! (Am I Chunja?!)

## 사용된 기술

`TypeScript`, `Next.js 16`, `React 19`, `Google Sheets API`, `CSS Modules`, `Playwright`

## 프로젝트 소개

- 사용자의 영어 이름이 미국에서 어떤 느낌인지 알려주는 재미있는 🤩 웹 서비스입니다.
- 성별, 세대, 성격에 맞는 영어 이름 추천 서비스도 제공합니다. 🚀
- 2025 미국 아기이름 Top 100 페이지도 있습니다.

## 주요 기능

1. **영어 이름 검색**: 내 영어 이름이 촌스러운지 트렌디한지 확인
2. **이름 추천**: 성별, 세대, 성격 특성을 기반으로 한 맞춤형 영어 이름 추천
3. **결과 저장과 공유**: 결과를 이미지로 저장하고, 이름별 공유 이미지로 링크 공유

## 데이터 구조

- 이름 데이터는 구글 시트 `names` 탭에서 관리합니다.
- 서버에서만 시트를 읽고 1시간 동안 캐시합니다.
- 시트를 고치면 최대 1시간 뒤에 사이트에 반영됩니다.
- 브라우저에는 이름 데이터 전체를 보내지 않습니다.
- 검색 자동완성에는 이름 목록만 보냅니다.
- 이름 추천은 서버 액션 `recommendName` 이 이름 하나만 골라서 돌려줍니다.
- 같은 이름이 여러 행에 있으면 첫 행만 씁니다.

## 페이지

- `/` : 이름 검색
- `/result/[name]` : 검색 결과 (정적 생성, 1시간마다 재검증)
- `/your-english-name` : 이름 추천
- `/recommend/[name]` : 추천 결과 (검색엔진 색인 제외)
- `/top-baby-names-2025` : 2025 미국 아기이름 Top 100
- `/sitemap.xml`, `/robots.txt` : 검색엔진용

## 로컬 실행

- `.env.example` 을 참고해 `.env.local` 을 만듭니다.
- `vercel env pull .env.local` 로 받아와도 됩니다.
- `npm install` 후 `npm run dev` 로 실행합니다.

## 테스트

- `npm run build` 후 `npm run test:e2e` 를 실행합니다.
- 테스트가 3100 포트로 `next start` 를 띄워서 확인합니다.
- 설치된 Chrome을 쓰려면 `PW_CHANNEL=chrome` 을 붙입니다.
- 배포된 주소를 테스트하려면 `BASE_URL` 을 지정합니다.
- 운영 주소는 광고 요청이 계속 이어져서 `WAIT_UNTIL=load` 를 같이 지정합니다.
- 보호된 프리뷰는 `vercel env run -- npm run test:e2e` 로 실행합니다.
- 이때 OIDC 토큰이 프리뷰 도메인 요청에만 붙습니다.

## 향후 업데이트 예정 🔮

- [ ] 재미로 보는 영어 이름 궁합
- [ ] 이름 히스토리 저장 기능
- [ ] 다국어 지원 (English)

## 프로젝트 구조

```
src/app/
├─ (shared)/
│  ├─ actions/          # 서버 액션 (이름 추천)
│  ├─ components/
│  │  ├─ english-name/  # 이름 추천 화면
│  │  ├─ layout/        # 헤더, 푸터
│  │  ├─ modals/        # 감사 인사, 이름 제보 팝업
│  │  ├─ scripts/       # AdSense, GA 스크립트
│  │  └─ search/        # 검색, 검색 결과, 없는 이름 안내
│  ├─ constants/
│  ├─ data/             # Top 100 데이터
│  ├─ hooks/
│  ├─ types/
│  └─ utils/            # 시트 읽기, 이름 찾기, 이벤트 추적
├─ recommend/[name]/    # 추천 결과
├─ result/[name]/       # 검색 결과, 공유 이미지
├─ top-baby-names-2025/
├─ your-english-name/
├─ error.tsx
├─ layout.tsx
├─ page.tsx
├─ robots.ts
└─ sitemap.ts
assets/fonts/           # 공유 이미지용 Noto Sans KR (OFL)
e2e/                    # Playwright 테스트
lib/                    # 구글 시트 클라이언트
```
