import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { Raleway } from 'next/font/google';
import Footer from '@/components/Footer';
import { MenuMobileContextProvider } from '@/contexts/MenuMobileContext';
import { CryptoContextProvider } from '@/contexts/CryptoContext';

const raleway = Raleway({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Market Watch',
  description: 'The best solution for market analysis.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={
          'bg-background text-white px-6 md:px-24 mx-auto xl:max-w-screen-2xl'
        }
      >
        <MenuMobileContextProvider>{<Header />}</MenuMobileContextProvider>
        <CryptoContextProvider>{children}</CryptoContextProvider>
        <Footer />
      </body>
    </html>
  );
}
