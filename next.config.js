/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'zechem-products.s3.amazonaws.com',
        }, ],
    },
    env: {
        SERVER_ENDPOINT: "https://wky58fywke.execute-api.eu-west-1.amazonaws.com/dev",
    },
}

module.exports = nextConfig