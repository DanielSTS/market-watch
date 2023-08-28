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
          ? 'border-b-2 border-blue-500 text-blue-500'
          : 'border-b-2 border-transparent hover:border-blue-500 text-white'
      } p-4`}
    >
      {label}
    </Link>
  );
}
