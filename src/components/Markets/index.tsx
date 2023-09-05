'use client';
import Image from 'next/image';
import Link from 'next/link';
import { CryptocurrencyData, useCryptoContext } from '@/contexts/CryptoContext';
import { PiArrowRightBold } from 'react-icons/pi';
import Chart from '@/components/Chart';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

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
  const [sortBy, setSortBy] = useState<{
    column: string | null;
    direction: 'asc' | 'desc';
  }>({
    column: 'marketCapRank',
    direction: 'asc'
  });

  useEffect(() => {
    const filteredData = cryptoData.filter(
      crypto =>
        crypto.name.toLowerCase().includes(text.toLowerCase()) ||
        crypto.ticker.toLowerCase().includes(text.toLowerCase())
    );

    const startIndex = offset;
    const endIndex = startIndex + LIMIT;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const sortedData = [...paginatedData].sort((a, b) => {
      if (sortBy.column) {
        if (sortBy.column === 'prices') {
          const columnA = a.prices;
          const columnB = b.prices;

          if (columnA.length === 0 && columnB.length === 0) {
            return 0;
          } else if (columnA.length === 0) {
            return sortBy.direction === 'asc' ? -1 : 1;
          } else if (columnB.length === 0) {
            return sortBy.direction === 'asc' ? 1 : -1;
          }

          const percentageChangeA =
            ((columnA[columnA.length - 1] - columnA[0]) / columnA[0]) * 100;
          const percentageChangeB =
            ((columnB[columnB.length - 1] - columnB[0]) / columnB[0]) * 100;

          if (percentageChangeA < percentageChangeB) {
            return sortBy.direction === 'asc' ? -1 : 1;
          }
          if (percentageChangeA > percentageChangeB) {
            return sortBy.direction === 'asc' ? 1 : -1;
          }
          return 0;
        } else {
          const columnA = a[sortBy.column as keyof CryptocurrencyData];
          const columnB = b[sortBy.column as keyof CryptocurrencyData];

          if (columnA < columnB) {
            return sortBy.direction === 'asc' ? -1 : 1;
          }
          if (columnA > columnB) {
            return sortBy.direction === 'asc' ? 1 : -1;
          }
          return 0;
        }
      }
      return 0;
    });

    setCurrentCryptoData(sortedData);
    setFilteredCryptoData(filteredData);
  }, [text, offset, cryptoData, sortBy]);

  function handleHeaderClick(column: string) {
    if (sortBy.column === column) {
      setSortBy({
        ...sortBy,
        direction: sortBy.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setSortBy({
        column,
        direction: 'asc'
      });
    }
  }

  function renderSortIcon(column: string) {
    if (sortBy.column === column) {
      return sortBy.direction === 'asc' ? '↑' : '↓';
    }
    return null;
  }

  return (
    <section className="py-12 flex flex-col gap-6">
      <div className="w-1/4 bg-main gap-2 flex rounded-md border-2 border-zinc-800 focus-within:ring-2 focus-within:ring-greenHover">
        <label htmlFor="cryptoSearch" className="sr-only">
          Search crypto
        </label>
        <BiSearch
          className="w-7 h-7 text-zinc-500 hover:text-zinc-400 hover:shadow-md hover:transition hover:duration-300 p-1"
          aria-hidden="true"
        />
        <input
          type="text"
          id="cryptoSearch"
          placeholder="Search crypto..."
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-grow text-zinc-300 bg-main focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border-2 border-zinc-800">
        <table className="table-auto text-zinc-300 w-full min-w-max bg-main overflow-hidden">
          <thead>
            <tr className="text-left">
              <th
                className="px-4 py-2 text-center font-semibold cursor-pointer"
                onClick={() => handleHeaderClick('marketCapRank')}
              >
                Nº{' '}
                {sortBy.column === 'marketCapRank' &&
                  renderSortIcon('marketCapRank')}
              </th>
              <th
                className="font-semibold cursor-pointer px-4 py-2"
                onClick={() => handleHeaderClick('name')}
              >
                Name {sortBy.column === 'name' && renderSortIcon('name')}
              </th>
              <th
                className="font-semibold cursor-pointer text-right px-4 py-2"
                onClick={() => handleHeaderClick('price')}
              >
                Price {sortBy.column === 'price' && renderSortIcon('price')}
              </th>
              <th
                className="font-semibold cursor-pointer text-right px-4 py-2"
                onClick={() => handleHeaderClick('change')}
              >
                Change 24h{' '}
                {sortBy.column === 'change' && renderSortIcon('change')}
              </th>
              <th
                className="font-semibold cursor-pointer text-right px-4 py-2"
                onClick={() => handleHeaderClick('marketCap')}
              >
                Market Cap{' '}
                {sortBy.column === 'marketCap' && renderSortIcon('marketCap')}
              </th>
              <th
                className="font-semibold cursor-pointer text-center px-4 py-2"
                onClick={() => handleHeaderClick('prices')}
              >
                7d {sortBy.column === 'prices' && renderSortIcon('prices')}
              </th>
              <th className="font-semibold text-center px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentCryptoData.map((crypto: CryptocurrencyData) => (
              <tr
                key={crypto.id}
                className="bg-main rounded-2xl border-t-2 border-b-2 border-zinc-800 last:border-none"
              >
                <td className="text-center px-4 py-2">
                  {crypto.marketCapRank}
                </td>
                <td className="px-4 py-2">
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
                <td className="text-right px-4 py-2">{crypto.price}</td>
                <td
                  className={`${
                    crypto.change < 0 ? 'text-redMain' : 'text-greenMain'
                  } font-semibold text-right px-4 py-2`}
                >
                  {crypto.change}%
                </td>
                <td className="text-right px-4 py-2">
                  ${crypto.marketCap.toLocaleString()}
                </td>
                <td className="flex justify-center px-4 py-2">
                  <Chart prices={crypto.prices} height={45} width={90} />
                </td>
                <td className="px-4 py-2">
                  <Link href={'markets'} className="flex justify-center">
                    <PiArrowRightBold
                      className={
                        'w-8 h-8 text-zinc-500 hover:text-zinc-400 hover:shadow-md hover:transition hover:duration-300 rounded-full p-1 bg-zinc-900'
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
