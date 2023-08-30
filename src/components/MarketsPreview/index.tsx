import CryptoSummary from '@/components/CryptoSummary';
import Link from 'next/link';

export default function MarketsPreview() {
  return (
    <section className={'pt-8 pb-16 flex flex-col gap-10'}>
      <div className={'flex items-center justify-between gap-2'}>
        <h2 className={'font-bold text-3xl'}>Markets</h2>
        <Link
          href={'markets'}
          className={
            'bg-green rounded-2xl px-4 py-1 text-sm font-semibold hover:bg-greenHover shadow-md transition duration-300'
          }
        >
          Ver todos
        </Link>
      </div>
      <div className={'flex items-center justify-center flex-wrap gap-4'}>
        <CryptoSummary ticker={'btc'} />
        <CryptoSummary ticker={'eth'} />
        <CryptoSummary ticker={'xrp'} />
        <CryptoSummary ticker={'dai'} />
      </div>
    </section>
  );
}
