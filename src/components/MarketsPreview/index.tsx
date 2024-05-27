import CryptoSummary from '@/components/CryptoSummary';
import Link from 'next/link';

export default function MarketsPreview() {
  return (
    <section className={'flex flex-col gap-10 pb-16 pt-8'}>
      <div className={'flex items-center justify-between gap-2'}>
        <h2 className={'text-3xl font-bold'}>Markets</h2>
        <Link
          href={'markets'}
          className={
            'rounded-2xl bg-greenMain px-4 py-1 text-sm font-semibold hover:bg-greenHover hover:shadow-md hover:transition hover:duration-300'
          }
        >
          Ver todos
        </Link>
      </div>
      <div className={'flex flex-wrap items-center justify-center gap-4'}>
        <CryptoSummary ticker={'btc'} />
        <CryptoSummary ticker={'eth'} />
        <CryptoSummary ticker={'xrp'} />
        <CryptoSummary ticker={'dai'} />
      </div>
    </section>
  );
}
