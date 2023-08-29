'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCryptoContext } from '@/providers/CryptoProvider';

export default function Markets() {
  const cryptoData = useCryptoContext();
  return (
    <section className="py-12">
      <div className="overflow-x-auto rounded-lg border-2 border-zinc-800">
        <table className="table-auto text-zinc-300 w-full min-w-max bg-main overflow-hidden">
          <thead>
            <tr className="text-left">
              <th className="p-4 text-center font-semibold">Nº</th>
              <th className="font-semibold">Name</th>
              <th className="font-semibold">Price</th>
              <th className="font-semibold">Change</th>
              <th className="font-semibold">Market Cap</th>
              <th className="font-semibold">Chart</th>
              <th className="font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr
                key={crypto.id}
                className="bg-main rounded-2xl border-t-2 border-b-2 border-zinc-800 last:border-none"
              >
                <td className="text-center">{index + 1}</td>
                <td className="">
                  <div className="flex items-center gap-3">
                    <Image
                      className="w-8 h-8"
                      src={`${crypto.image}`}
                      alt={crypto.ticker}
                      width={20}
                      height={20}
                    />
                    <p className={''}>
                      {`${crypto.name} | `}
                      <strong className="font-semibold">
                        {crypto.ticker.toUpperCase()}
                      </strong>
                    </p>
                  </div>
                </td>
                <td className="">{crypto.price}</td>
                <td
                  className={`${crypto.change < 0 ? 'text-red' : 'text-green'}`}
                >
                  {crypto.change}%
                </td>
                <td className="">${crypto.marketCap.toLocaleString()}</td>
                <td className="">
                  <Image
                    className="mt-4 w-24 h-12"
                    src={`${crypto.change < 0 ? 'chart2.svg' : 'chart.svg'}`}
                    alt={`${crypto.name} chart`}
                    width={140}
                    height={140}
                  />
                </td>
                <td className="">
                  <Link
                    href={'markets'}
                    className={
                      'rounded-xl px-4 py-1 bg-green hover:bg-greenHover shadow-md transition duration-300'
                    }
                  >
                    -{'>'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
