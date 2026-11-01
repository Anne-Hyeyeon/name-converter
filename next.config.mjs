const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
  },
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/amI.png", search: "?v=1" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      {
        source: "/result/:name",
        has: [{ type: "query", key: "from", value: "recommendation" }],
        destination: "/recommend/:name",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
