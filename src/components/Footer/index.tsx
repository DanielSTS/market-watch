import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-around gap-2 border-t border-zinc-800 py-16">
      <Image
        className={'h-10 w-44'}
        src={'logo.svg'}
        alt="Logo"
        width={140}
        height={140}
      />
      <p className={'text-base text-zinc-600'}>
        2023 CryptoWise. All rights reserved.
      </p>
    </footer>
  );
}
