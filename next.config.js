/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = nextConfig;

// Initialize Cloudflare for dev (optional - requires Wrangler login)
if (process.env.NODE_ENV !== 'production' && !process.env.SKIP_CLOUDFLARE) {
  import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev()).catch(() => {});
}
