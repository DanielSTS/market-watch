'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItemProps = {
  href: string;
  label: string;
};
export default function MenuItem({ href, label }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? 'text-green'
          : 'text-white hover:text-greenHover shadow-md transition duration-300'
      } p-4 text-xl font-semibold font-normal`}
    >
      {label}
    </Link>
  );
}
