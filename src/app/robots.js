export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://whimperboard.vercel.app/sitemap.xml',
  }
}