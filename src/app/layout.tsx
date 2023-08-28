import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Market Watch',
  description: 'The best solution for market analysis.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={'bg-background text-white'}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
