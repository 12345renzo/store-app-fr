/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/store/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
