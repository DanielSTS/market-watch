'use client';
import MenuItem from '@/components/MenuItem';
import Image from 'next/image';
import { useMenuMobileContext } from '@/contexts/MenuMobileContext';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { useEffect } from 'react';

export default function Header() {
  const { isVisible, setIsVisible } = useMenuMobileContext();
  useEffect(() => {
    document.body.style.overflowY = isVisible ? 'hidden' : 'auto';
  }, [isVisible]);
  return (
    <header className="flex items-center justify-between bg-background py-4">
      <Image src={'logo.svg'} alt="Logo" width={176} height={40} />
      <nav>
        <ul className="hidden items-center justify-center gap-4 md:flex">
          <li>
            <MenuItem href="/" label="Home" />
          </li>
          <li>
            <MenuItem href="/markets" label="Markets" />
          </li>
          <li>
            <MenuItem href="/correlation" label="Correlation" />
          </li>
          <li>
            <MenuItem href="/backtest" label="Backtest" />
          </li>
        </ul>

        <button
          className={`text-white md:hidden ${
            isVisible ? 'fixed right-6 top-6 z-10' : ''
          }`}
          onClick={() => setIsVisible(prev => !prev)}
        >
          {isVisible ? <CgClose /> : <GiHamburgerMenu />}
        </button>
        {isVisible && (
          <ul className="fixed left-0 top-12 flex h-[calc(100vh-48px)] w-full flex-col items-center justify-center gap-9 bg-background">
            <li>
              <MenuItem href="/" label="Home" />
            </li>
            <li>
              <MenuItem href="/markets" label="Markets" />
            </li>
            <li>
              <MenuItem href="/#news" label="News" />
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
