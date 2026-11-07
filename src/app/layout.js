import './globals.css';

export const metadata = {
  title: 'Whimperboard - SaaS Kennel Management',
  description: 'Manage kennel boxes, subscriptions, and dog profiles effortlessly. 14-day free trial available.',
  openGraph: {
    title: 'Whimperboard - Kennel Management Made Simple',
    description: 'Track and manage your kennel boxes effortlessly.',
    url: 'https://whimperboard.vercel.app',
    siteName: 'Whimperboard',
    type: 'website',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ccff00" />
      </head>
      <body className="bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}