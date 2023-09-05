import MarketsPreview from '@/components/MarketsPreview';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section
        className={
          'flex flex-col gap-4 px-12 pt-12 items-center justify-around text-center'
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
            'bg-greenMain rounded-2xl px-12 py-3 text-xl font-semibold mt-12 hover:bg-greenHover hover:shadow-md hover:transition hover:duration-300'
          }
        >
          Explorar
        </Link>
      </section>
      <MarketsPreview />
    </>
  );
}
