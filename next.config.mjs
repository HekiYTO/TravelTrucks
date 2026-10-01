/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Хост картинок API заранее неизвестен. После проверки ответа API
    // замени на конкретный hostname.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
