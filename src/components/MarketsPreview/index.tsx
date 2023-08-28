import CryptoSummary from '@/components/CryptoSummary';

export default function MarketsPreview() {
  return (
    <section className={'pt-8 pb-16 flex flex-col gap-10'}>
      <div className={'flex items-center justify-between gap-2'}>
        <h2 className={'font-bold text-3xl'}>Markets</h2>
        <button
          className={'bg-green rounded-2xl px-4 py-1 text-sm font-semibold'}
        >
          Ver todos
        </button>
      </div>
      <div className={'flex items-center justify-center flex-wrap gap-4'}>
        <CryptoSummary crypto={'Bitcoin'} ticker={'btc'} />
        <CryptoSummary crypto={'Ethereum'} ticker={'eth'} />
        <CryptoSummary crypto={'Bitcoin'} ticker={'btc'} />
        <CryptoSummary crypto={'Ethereum'} ticker={'eth'} />
      </div>
    </section>
  );
}
