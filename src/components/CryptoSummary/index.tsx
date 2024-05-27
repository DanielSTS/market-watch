'use client';
import Image from 'next/image';
import { PiArrowUpRightBold } from 'react-icons/pi';
import Link from 'next/link';
import { useCryptoContext } from '@/contexts/CryptoContext';
import Chart from '@/components/Chart';

interface CryptoSummaryProps {
  ticker: string;
}

export default function CryptoSummary({ ticker }: CryptoSummaryProps) {
  const cryptoData = useCryptoContext();
  const crypto = cryptoData.find(x => x.ticker === ticker);
  return (
    <div className="flex flex-col items-center justify-around rounded-3xl bg-main px-3 pt-3">
      <div
        className={
          'flex items-center justify-between gap-5 border-b border-zinc-700 p-3'
        }
      >
        <Image
          className={'h-11 w-11'}
          src={crypto?.image || ''}
          alt={crypto?.ticker || ''}
          width={140}
          height={140}
        />
        <span className={'text-lg font-semibold'}>{ticker.toUpperCase()}</span>
        <span className={'rounded-2xl bg-zinc-600 px-2 py-0.5  text-xs'}>
          {crypto?.name.toUpperCase()}
        </span>
        <Link href={'markets'}>
          <PiArrowUpRightBold
            className={
              'h-8 w-8 rounded-full bg-zinc-900 p-1 text-zinc-500 hover:text-zinc-400 hover:shadow-md hover:transition hover:duration-300'
            }
          />
        </Link>
      </div>

      <div className={'flex items-center justify-between gap-8 p-4'}>
        <div>
          <p className={'text-2xl'}>{crypto?.price}</p>
          <p className={'text-base text-zinc-400'}>{crypto?.change}%</p>
        </div>

        {crypto && <Chart prices={crypto.prices} height={50} width={100} />}
      </div>
    </div>
  );
}
