/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/amI.png", search: "?v=1" },
    ],
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
