import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {

        domains: ['localhost', 'localhost:1349', 'electrohub.by', "strapi.electrohub.by"]
    },
    generateBuildId: async () => {
        return process.env.GIT_HASH
    }

};

export default withNextIntl(nextConfig);
