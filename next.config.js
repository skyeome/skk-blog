/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // trailingSlash: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "localhost"],
    loader: "akamai",
    path: "",
  },
  generateBuildId: () => "skkblog-deploy-project",
  // 아래 주소들만 out폴더에 만들어준다. => getServerSideProps있는 페이지는 제외
  exportPathMap: () => ({
    "/": { page: "/" },
    "/auth/find-password": { page: "/auth/find-password" },
    "/auth/signin": { page: "/auth/signin" },
    "/auth/signup": { page: "/auth/signup" },
    "/free": { page: "/free" },
    "/free/new": { page: "/free/new" },
    "/404": { page: "/404" },
  }),
};

module.exports = nextConfig;
