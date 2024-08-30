/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'noona-hnm.netlify.app',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
