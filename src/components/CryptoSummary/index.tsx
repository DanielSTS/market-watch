import Image from 'next/image';
import { PiArrowUpRightBold } from 'react-icons/pi';

interface CryptoSummaryProps {
  crypto: string;
  ticker: string;
}
export default function CryptoSummary({ crypto, ticker }: CryptoSummaryProps) {
  return (
    <div className="rounded-3xl bg-main flex flex-col px-3 pt-3 items-center justify-around">
      <div
        className={
          'flex items-center justify-between gap-5 border-b border-zinc-700 p-3'
        }
      >
        <Image
          className={'w-11 h-11'}
          src={`${ticker}.svg`}
          alt="Logo"
          width={140}
          height={140}
        />
        <span className={'text-lg font-semibold'}>{ticker.toUpperCase()}</span>
        <span
          className={
            'rounded-2xl bg-zinc-600 px-2.5 py-1  text-xs font-semibold'
          }
        >
          {crypto}
        </span>
        <button>
          <PiArrowUpRightBold
            className={'w-6 h-6 text-zinc-500 hover:text-zinc-400'}
          />
        </button>
      </div>

      <div className={'flex items-center gap-8 justify-between'}>
        <div>
          <p className={'text-2xl'}>$56,623.54</p>
          <p className={'text-base text-zinc-400'}>1.41%</p>
        </div>

        <Image
          className={'w-24 h-24'}
          src={'chart.svg'}
          alt="Logo"
          width={140}
          height={140}
        />
      </div>
    </div>
  );
}
