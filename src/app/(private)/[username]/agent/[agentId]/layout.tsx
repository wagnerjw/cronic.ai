import '@/app/globals.css';
import { jbmono } from '@/fonts/JetbrainsMono';
import type { Metadata } from 'next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'CRONIC',
  description: 'schedule your AI Agent tasks with CRONIC',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jbmono.className}>
        <main className="items-center flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
