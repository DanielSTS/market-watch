import MenuItem from '@/components/MenuItem';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-2 px-8 bg-main-color border-b border-zinc-800">
      <div className="flex gap-4">
        <Image src={'next.svg'} alt="Logo" />
        Market Watch
      </div>
      <nav className="">
        <ul className="flex items-center justify-between gap-4 ">
          <li>
            <MenuItem href="/" label="Página 1" />
          </li>
          <li>
            <MenuItem href="/page2" label="Página 2" />
          </li>
          <li>
            <MenuItem href="/page3" label="Página 3" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
