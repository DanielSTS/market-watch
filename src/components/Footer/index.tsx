import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 flex flex-col gap-2 py-16 items-center justify-around">
      <Image
        className={'w-44 h-10'}
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
