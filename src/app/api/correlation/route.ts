export async function GET(request: Request) {
  const symbols = [
    'BTC-USD',
    'ETH-USD',
    'XRP-USD',
    'ADA-USD',
    'DOGE-USD',
    'SOL-USD',
    'LTC-USD',
    'MATIC-USD',
    'SHIB-USD'
  ];

  try {
    const correlations: Record<string, number> = {};

    for (let i = 0; i < symbols.length; i++) {
      for (let j = i + 1; j < symbols.length; j++) {
        const symbol1 = symbols[i];
        const symbol2 = symbols[j];

        const data1 = await getCoinbaseProData(symbol1);
        const data2 = await getCoinbaseProData(symbol2);

        correlations[`${symbol1}/${symbol2}`] = calculateCorrelation(
          data1,
          data2
        );
      }
    }

    return new Response(JSON.stringify(correlations), {
      status: 200
    });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500
    });
  }
}

async function getCoinbaseProData(symbol: string, interval = '1d') {
  try {
    const response = await fetch(
      `https://api.pro.coinbase.com/products/${symbol}/candles?granularity=${interval}`
    ).then(response => response.json());

    return response.map((entry: number[]) => {
      return {
        date: new Date(entry[0] * 1000),
        low: entry[1],
        high: entry[2],
        open: entry[3],
        close: entry[4],
        volume: entry[5]
      };
    });
  } catch (error: any) {
    console.log(symbol);
    throw new Error(`Error fetching Coinbase Pro data: ${error.message}`);
  }
}

function calculateCorrelation(data1: any, data2: any) {
  if (data1.length !== data2.length) {
    throw new Error('Data sets have different sizes.');
  }

  const n = data1.length;

  const mean1 =
    data1.reduce((sum: number, entry: any) => sum + entry.close, 0) / n;
  const mean2 =
    data2.reduce((sum: number, entry: any) => sum + entry.close, 0) / n;

  let numerator = 0;
  let denominator1 = 0;
  let denominator2 = 0;

  for (let i = 0; i < n; i++) {
    const xDeviation = data1[i].close - mean1;
    const yDeviation = data2[i].close - mean2;

    numerator += xDeviation * yDeviation;
    denominator1 += xDeviation ** 2;
    denominator2 += yDeviation ** 2;
  }

  return numerator / Math.sqrt(denominator1 * denominator2);
}
