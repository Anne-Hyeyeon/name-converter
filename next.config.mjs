/** @type {import('next').NextConfig} */
const nextConfig = {
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
