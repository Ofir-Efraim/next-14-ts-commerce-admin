/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'zechem-products.s3.amazonaws.com',
        }, ],
    },
    env: {
        SERVER_ENDPOINT: process.env.SERVER_ENDPOINT,
    },
}

module.exports = nextConfig