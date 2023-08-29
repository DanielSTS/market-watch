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

type CryptocurrencyData = {
  id: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  image: string;
  ticker: string;
};

function createData(
  name: string,
  price: number,
  change: number,
  marketCap: number,
  image: string,
  ticker: string
): CryptocurrencyData {
  return { id: name, name, price, change, marketCap, image, ticker };
}

type CryptoProviderProps = {
  children: ReactNode;
};

export function CryptoProvider({ children }: CryptoProviderProps) {
  const [cryptoData, setCryptoData] = useState<CryptocurrencyData[]>([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
      )
        .then(response => response.json())
        .then(data => {
          const formattedData: CryptocurrencyData[] = data.map((item: any) =>
            createData(
              item.id,
              parseFloat(item.current_price),
              parseFloat(item.price_change_percentage_24h),
              parseFloat(item.market_cap),
              item.image,
              item.symbol
            )
          );
          setCryptoData(formattedData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

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
