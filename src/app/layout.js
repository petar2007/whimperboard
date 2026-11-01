import './globals.css';

export const metadata = {
  title: 'Whimperboard - Kennel & Care Management System',
  description: 'Manage your kennel boxes, dogs and care reminders effortlessly.',
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