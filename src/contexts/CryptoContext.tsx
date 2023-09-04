'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

const CryptoContext = createContext<CryptocurrencyData[]>([]);

export const useCryptoContext = () => {
  return useContext(CryptoContext);
};

export type CryptocurrencyData = {
  id: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  image: string;
  ticker: string;
  prices: number[];
  marketCapRank: number;
};

type CoinGeckoResponse = {
  id: string;
  current_price: string;
  price_change_percentage_24h: string;
  market_cap: string;
  image: string;
  symbol: string;
  sparkline_in_7d: { price: string[] };
  market_cap_rank: string;
};

type CryptoProviderProps = {
  children: ReactNode;
};

function getCachedData() {
  const cachedData = localStorage.getItem('cryptoData');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return [];
}

export function CryptoContextProvider({ children }: CryptoProviderProps) {
  const [cryptoData, setCryptoData] = useState<CryptocurrencyData[]>([]);

  async function fetchData() {
    await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true&per_page=250'
    )
      .then(response => response.json())
      .then(data => {
        const formattedData: CryptocurrencyData[] = data.map(
          (item: CoinGeckoResponse): CryptocurrencyData => {
            return {
              id: item.id,
              name: item.id,
              price: parseFloat(item.current_price),
              change: parseFloat(item.price_change_percentage_24h),
              marketCap: parseFloat(item.market_cap),
              image: item.image,
              ticker: item.symbol,
              prices: item.sparkline_in_7d.price.map((x: string) =>
                parseFloat(x)
              ),
              marketCapRank: parseFloat(item.market_cap_rank)
            };
          }
        );
        localStorage.setItem('cryptoData', JSON.stringify(formattedData));
        setCryptoData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        const cachedData = getCachedData();
        setCryptoData(cachedData);
      });
  }

  useEffect(() => {
    void fetchData();

    const interval = setInterval(() => {
      void fetchData();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <CryptoContext.Provider value={cryptoData}>
      {children}
    </CryptoContext.Provider>
  );
}
