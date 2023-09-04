export async function GET(request: Request) {
  const symbols = [
    'BTCUSDT',
    'ETHUSDT',
    'BNBUSDT',
    'XRPUSDT',
    'ADAUSDT',
    'DOGEUSDT',
    'SOLUSDT',
    'LTCUSDT',
    'MATICUSDT'
  ];

  try {
    const correlations: Record<string, number> = {};

    for (let i = 0; i < symbols.length; i++) {
      for (let j = i + 1; j < symbols.length; j++) {
        const symbol1 = symbols[i];
        const symbol2 = symbols[j];

        const data1 = await getBinanceData(symbol1);
        const data2 = await getBinanceData(symbol2);

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

async function getBinanceData(symbol: string, interval = '1d') {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
    ).then(response => response.json());
    return response.map((entry: string[]) => {
      return {
        date: new Date(entry[0]),
        open: parseFloat(entry[1]),
        high: parseFloat(entry[2]),
        low: parseFloat(entry[3]),
        close: parseFloat(entry[4]),
        volume: parseFloat(entry[5])
      };
    });
  } catch (error: any) {
    throw new Error(`Erro ao obter dados da Binance: ${error.message}`);
  }
}

function calculateCorrelation(data1: any, data2: any) {
  if (data1.length !== data2.length) {
    throw new Error('Os conjuntos de dados têm tamanhos diferentes.');
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
