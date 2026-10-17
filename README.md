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

## 연도별 출생아 수 데이터

- 결과 페이지 그래프는 미국 사회보장국(SSA) 출생 이름 통계를 씁니다.
- 데이터는 구글 시트 `us_name_trends`, `us_year_rankings` 탭에 있습니다.
- 시트에 있는 이름만 추려서 만듭니다.
- SSA는 매년 봄에 전년도 데이터를 공개합니다.
- 갱신할 때는 SSA 사이트에서 National data(`names.zip`)를 받아 압축을 풉니다.
- 그다음 `node --env-file=.env.local scripts/build-name-trends.mjs <압축 푼 폴더>` 를 실행합니다.
- 시트에 이름을 추가한 뒤에도 같은 명령으로 다시 만들어야 그래프가 나옵니다.

## 페이지

- `/` : 이름 검색
- `/result/[name]` : 검색 결과 (정적 생성, 1시간마다 재검증)
- `/your-english-name` : 이름 추천
- `/recommend/[name]` : 추천 결과 (검색엔진 색인 제외)
- `/top-baby-names-2025` : 2025 미국 아기이름 Top 100
- `/korean-name` : 외국인용 영어 페이지. 영어 이름에 맞는 한국 이름 찾기
- `/korean-name/[name]` : 한국 이름 결과와 "한국에서 태어났다면" 연도별 이름
- `/korean-name/born`, `/korean-name/born/[year]` : 연도별 한국 인기 이름 Top 10
- `/korean-name/check/[slug]` : 한국 이름의 유행 시기 확인
- `/sitemap.xml`, `/robots.txt` : 검색엔진용

## 시트 데이터

- 레포가 public 이라 이름 데이터는 커밋하지 않습니다. 전부 구글 시트에 둡니다.
- 원본 `names` 탭은 스크립트가 쓰지 않습니다. `scripts/lib/sheets.mjs` 에서 막아 두었습니다.
- 서버는 탭을 읽어서 메모리에 1시간 둡니다. 시트를 고치면 최대 1시간 뒤에 반영됩니다.
- `data_meta` 탭에는 연도 범위와 출처 같은 값이 있습니다.
- `us_top100_2025` 는 2025 미국 Top 100 입니다.
- `korean_year_names` 는 연도별 한국 인기 이름입니다. 시트에서 직접 고칩니다.
- 2008년 이후는 대법원 전자가족관계등록시스템 "상위 출생신고 이름 현황", 그 전은 대법원 발표를 보도한 기사입니다.
- 새 연도를 넣을 때는 `source_en` 에 영어 출처를 같이 적습니다.
- `korean_name_stats` 는 이름 확인 페이지 그래프입니다. 2008~2025년 전국, 시도, 일부 시군구 Top 20을 합친 하한값입니다.
- 대법원이 2026-08-20부터 매크로 수집을 막는다고 공지했습니다. 이 통계는 더 자동으로 모으지 않습니다.
- `korean_celebrities` 는 같은 본명을 가진 한국 가수, 배우입니다. Wikidata(CC0)에서 가져오고 예명은 쓰지 않습니다.
- 소속 그룹 보정은 `korean_celebrity_groups`, 사람 추가는 `korean_celebrity_extra`, 그룹 표기는 `korean_group_names` 탭에서 합니다.
- 보정 탭을 고친 뒤에는 아래 두 명령을 차례로 실행합니다.
- `node scripts/fetch-korean-celebrities.mjs` 는 Wikidata에서 받아 `scripts/data/` 에 둡니다. 이 폴더는 커밋하지 않습니다.
- `node --env-file=.env.local scripts/build-korean-names.mjs` 는 보정 탭을 합쳐 `korean_celebrities`, `korean_name_stats` 탭을 다시 씁니다.
- 화면 문구는 `src/app/korean-name/i18n/` 에 있습니다. 언어를 늘릴 때 같은 형태의 사전을 추가합니다.

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
scripts/                # 연도별 출생아 수 데이터 생성
lib/                    # 구글 시트 클라이언트
```
