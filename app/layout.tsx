import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/unique/Navbar';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Navbar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
