import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [
            "localhost",
            "localhost:1349",
            "electrohub.by",
            "strapi.electrohub.by",
        ],
    },
    generateBuildId: async () => {
        return process.env.GIT_HASH;
    },
    env: {
        NEXT_PUBLIC_PUBLIC_URL: "https://electrohub.by",
        NEXT_PUBLIC_SERVER_URL: "https://strapi.electrohub.by",
        NEXT_PUBLIC_BOT_URL: "https://electrohub.by",
        GIT_HASH: "1",
    },

    experimental: {
        // …
        serverComponentsExternalPackages: ["@react-pdf/renderer"],
    },
};

export default withNextIntl(nextConfig);
