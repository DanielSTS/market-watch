import Image from 'next/image';

type CryptocurrencyData = {
  id: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  details: string;
  ticker: string;
};

function createData(
  name: string,
  price: number,
  change: number,
  marketCap: number,
  details: string,
  ticker: string
): CryptocurrencyData {
  return { id: name, name, price, change, marketCap, details, ticker };
}

const rows: CryptocurrencyData[] = [
  createData('Bitcoin', 43526, 2.3, 98234678, 'Details', 'btc'),
  createData('Ethereum', 3245, 1.2, 7435829, 'Details', 'eth'),
  createData('Cardano', 2.55, -16.0, 789123, 'Details', 'btc'), // Valor negativo de exemplo
  createData('Solana', 185.3, 3.7, 324567, 'Details', 'eth'),
  createData('Polkadot', 45.6, -16.0, 234578, 'Details', 'btc') // Valor negativo de exemplo
];

export default function Markets() {
  return (
    <section className="py-12">
      <div className="overflow-x-auto">
        <table className="table-auto text-zinc-300 w-full min-w-full bg-main rounded-lg border-collapse border border-zinc-800 overflow-hidden">
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
            {rows.map((crypto, index) => (
              <tr
                key={crypto.id}
                className="bg-main rounded-2xl border-t-2 border-b-2 border-zinc-800 last:border-none"
              >
                <td className="p-4 text-center">{index + 1}</td>
                <td className="">
                  <div className="flex items-center gap-3">
                    <Image
                      className="w-8 h-8"
                      src={`${crypto.ticker}.svg`}
                      alt={crypto.ticker}
                      width={20}
                      height={20}
                    />
                    <p>
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
                  <button
                    className={
                      'rounded-xl px-4 py-1 bg-green hover:bg-greenHover shadow-md transition duration-300'
                    }
                  >
                    --{'>'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
