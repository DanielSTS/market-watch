'use client';
import Image from 'next/image';
import { PiArrowUpRightBold } from 'react-icons/pi';
import Link from 'next/link';
import { useCryptoContext } from '@/providers/CryptoProvider';
import Chart from '@/components/Chart';

interface CryptoSummaryProps {
  ticker: string;
}

export default function CryptoSummary({ ticker }: CryptoSummaryProps) {
  const cryptoData = useCryptoContext();
  const crypto = cryptoData.find(x => x.ticker === ticker);
  return (
    <div className="rounded-3xl bg-main flex flex-col px-3 pt-3 items-center justify-around">
      <div
        className={
          'flex items-center justify-between gap-5 border-b border-zinc-700 p-3'
        }
      >
        <Image
          className={'w-11 h-11'}
          src={crypto?.image || ''}
          alt={crypto?.ticker || ''}
          width={140}
          height={140}
        />
        <span className={'text-lg font-semibold'}>{ticker.toUpperCase()}</span>
        <span
          className={
            'rounded-2xl bg-zinc-600 px-2.5 py-1  text-xs font-semibold'
          }
        >
          {crypto?.name}
        </span>
        <Link href={'markets'}>
          <PiArrowUpRightBold
            className={
              'w-6 h-6 text-zinc-500 hover:text-zinc-400 shadow-md transition duration-300'
            }
          />
        </Link>
      </div>

      <div className={'flex items-center gap-8 justify-between p-4'}>
        <div>
          <p className={'text-2xl'}>{crypto?.price}</p>
          <p className={'text-base text-zinc-400'}>{crypto?.change}%</p>
        </div>

        {crypto && (
          <Chart
            prices={crypto.prices}
            height={50}
            width={100}
            isHigh={crypto.change > 0}
          />
        )}
      </div>
    </div>
  );
}
