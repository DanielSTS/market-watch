'use client';
import Image from 'next/image';
import Link from 'next/link';
import { CryptocurrencyData, useCryptoContext } from '@/contexts/CryptoContext';
import { PiArrowRightBold } from 'react-icons/pi';
import Chart from '@/components/Chart';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';

const LIMIT = 5;
export default function Markets() {
  const cryptoData = useCryptoContext();
  const [currentCryptoData, setCurrentCryptoData] = useState<
    CryptocurrencyData[]
  >([]);
  const [filteredCryptoData, setFilteredCryptoData] = useState<
    CryptocurrencyData[]
  >([]);
  const [offset, setOffset] = useState<number>(0);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const filteredData = cryptoData.filter(
      crypto =>
        crypto.name.toLowerCase().includes(text.toLowerCase()) ||
        crypto.ticker.toLowerCase().includes(text.toLowerCase())
    );

    const startIndex = offset;
    const endIndex = startIndex + LIMIT;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setCurrentCryptoData(paginatedData);
    setFilteredCryptoData(filteredData);
  }, [text, offset, cryptoData]);

  return (
    <section className="py-12 flex flex-col gap-6">
      <input
        type="text"
        placeholder="Search crypto..."
        value={text}
        onChange={search => setText(search.target.value)}
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-zinc-700"
      />
      <div className="overflow-x-auto rounded-lg border-2 border-zinc-800">
        <table className="table-auto text-zinc-300 w-full min-w-max bg-main overflow-hidden">
          <thead>
            <tr className="text-left">
              <th className="p-4 text-center font-semibold">Nº</th>
              <th className="font-semibold">Name</th>
              <th className="font-semibold">Price</th>
              <th className="font-semibold">Change 24h</th>
              <th className="font-semibold">Market Cap</th>
              <th className="font-semibold">7d</th>
              <th className="font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentCryptoData.map((crypto, index) => (
              <tr
                key={crypto.id}
                className="bg-main rounded-2xl border-t-2 border-b-2 border-zinc-800 last:border-none"
              >
                <td className="text-center">{crypto.market_cap_rank}</td>
                <td className="p-4">
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
                  className={`${
                    crypto.change < 0 ? 'text-red' : 'text-green'
                  } font-semibold`}
                >
                  {crypto.change}%
                </td>
                <td className="">${crypto.marketCap.toLocaleString()}</td>
                <td className="">
                  <Chart
                    prices={crypto.prices}
                    height={45}
                    width={90}
                    isHigh={crypto.change > 0}
                  />
                </td>
                <td className="">
                  <Link href={'markets'}>
                    <PiArrowRightBold
                      className={
                        'w-6 h-6 text-zinc-500 hover:text-zinc-400 hover:shadow-md hover:transition hover:duration-300'
                      }
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        limit={LIMIT}
        total={filteredCryptoData.length}
        offset={offset}
        setOffset={setOffset}
      />
    </section>
  );
}
