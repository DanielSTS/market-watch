import MenuItem from '@/components/MenuItem';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-center md:justify-between py-4">
      <Image src={'logo.svg'} alt="Logo" width={176} height={40} />
      <nav className={'hidden md:flex'}>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <MenuItem href="/" label="Home" />
          </li>
          <li>
            <MenuItem href="/#markets" label="Markets" />
          </li>
          <li>
            <MenuItem href="/#news" label="Notícias" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
