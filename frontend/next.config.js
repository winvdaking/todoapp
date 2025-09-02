/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimisations de performance
    swcMinify: true,

    // Support des images et assets
    images: {
        domains: [],
    },

    // Configuration des headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Configuration des redirections
    async redirects() {
        return [];
    },

    // Configuration des rewrites
    async rewrites() {
        return [];
    },

    // Support du mode strict
    reactStrictMode: true,

    // Support du mode expérimental
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
