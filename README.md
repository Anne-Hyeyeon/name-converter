This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
name-converter
├─ .eslintrc.json
├─ .gitignore
├─ credentials.json
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
├─ src
│  └─ app
│     ├─ api
│     │  └─ sheets
│     │     └─ route.ts
│     ├─ components
│     │  ├─ BackButton.module.css
│     │  ├─ BackButton.tsx
│     │  ├─ CoopangBanner.tsx
│     │  ├─ Footer.module.css
│     │  ├─ Footer.tsx
│     │  ├─ NameNotFound.module.css
│     │  ├─ NameNotFound.tsx
│     │  ├─ NameUpdateModal.module.css
│     │  ├─ NameUpdateModal.tsx
│     │  ├─ NoticePopup.module.css
│     │  ├─ NoticePopup.tsx
│     │  ├─ NoticePopupWrapper.module.css
│     │  ├─ NoticePopupWrapper.tsx
│     │  ├─ ReportPopup.module.css
│     │  ├─ ReportPopup.tsx
│     │  ├─ SearchComponent.module.css
│     │  ├─ SearchComponent.tsx
│     │  ├─ SearchResult.module.css
│     │  ├─ SearchResult.tsx
│     │  ├─ UpdateBoard.module.css
│     │  └─ UpdateBoard.tsx
│     ├─ data
│     │  ├─ 20240729.ts
│     │  ├─ 20240730.ts
│     │  └─ 20240804.ts
│     ├─ Error.tsx
│     ├─ globals.css
│     ├─ layout.module.css
│     ├─ layout.tsx
│     ├─ Loading.tsx
│     ├─ page.tsx
│     ├─ result
│     │  └─ [name]
│     │     ├─ page.module.css
│     │     └─ page.tsx
│     ├─ types.ts
│     └─ utils
│        ├─ getAllNameData.ts
│        ├─ getAllUpdateData.ts
│        └─ snakeToCamel.ts
└─ tsconfig.json

```
