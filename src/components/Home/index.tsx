import MarketsPreview from '@/components/MarketsPreview';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section
        className={
          'flex flex-col items-center justify-around gap-4 px-12 pt-12 text-center'
        }
      >
        <h1 className={'text-5xl font-bold'}>Suas Criptos. Seu Controle.</h1>
        <p className={'text-xl text-zinc-400 xl:px-36'}>
          Sua central de informações sobre criptomoedas. Acompanhe preços,
          notícias e mais. Explore o mundo das criptos com facilidade.
        </p>

        <Link
          href={'markets'}
          className={
            'mt-12 rounded-2xl bg-greenMain px-12 py-3 text-xl font-semibold hover:bg-greenHover hover:shadow-md hover:transition hover:duration-300'
          }
        >
          Explorar
        </Link>
      </section>
      <MarketsPreview />
    </>
  );
}
