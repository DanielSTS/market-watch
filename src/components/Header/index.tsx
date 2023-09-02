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
    <header className="flex items-center justify-between py-4 bg-background">
      <Image src={'logo.svg'} alt="Logo" width={176} height={40} />
      <nav>
        <ul className="hidden md:flex items-center justify-center gap-4">
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

        <button
          className={`md:hidden text-white ${
            isVisible ? 'fixed top-6 right-6 z-10' : ''
          }`}
          onClick={() => setIsVisible(prev => !prev)}
        >
          {isVisible ? <CgClose /> : <GiHamburgerMenu />}
        </button>
        {isVisible && (
          <ul className="w-full h-[calc(100vh-48px)] bg-background fixed top-12 left-0 flex flex-col items-center justify-center gap-9">
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
