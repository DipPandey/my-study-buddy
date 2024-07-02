/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        loader: 'akamai',
        path: '/',
    },
    basePath: '/<your-repo-name>',
};

export default nextConfig;
