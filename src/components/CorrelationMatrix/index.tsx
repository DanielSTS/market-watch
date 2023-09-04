'use client';
import { useEffect, useState } from 'react';

const assets = [
  'BTC-USD',
  'ETH-USD',
  'XRP-USD',
  'ADA-USD',
  'DOGE-USD',
  'SOL-USD',
  'LTC-USD',
  'MATIC-USD',
  'SHIB-USD',
  'DOT-USD',
  'LINK-USD'
];

export default function CorrelationMatrix() {
  const [correlationMatrix, setCorrelationMatrix] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    fetch('/api/correlation')
      .then(response => response.json())
      .then(data => {
        setCorrelationMatrix(data);
      })
      .catch(error => {
        console.error('Erro ao buscar a matriz de correlação:', error);
      });
  }, []);

  function getColorForCorrelation(correlation: number): string {
    if (correlation === 0) {
      return 'gray';
    } else if (correlation > 0 && correlation <= 0.25) {
      return '#006738';
    } else if (correlation > 0.25 && correlation <= 0.5) {
      return '#035934';
    } else if (correlation > 0.5 && correlation <= 0.75) {
      return '#083926';
    } else if (correlation > 0.75 && correlation <= 1) {
      return '#00A859';
    } else if (correlation < 0 && correlation >= -0.25) {
      return '#BB2528';
    } else if (correlation < -0.25 && correlation >= -0.5) {
      return '#D4413F';
    } else if (correlation < -0.5 && correlation >= -0.75) {
      return '#F3666A';
    } else if (correlation < -0.75 && correlation >= -1) {
      return '#FF8B80';
    } else {
      return 'gray';
    }
  }

  return (
    <section className="py-12 flex items-center justify-center">
      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="table-fixed rounded-lg text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-main text-white font-semibold"></th>
              {assets.map(asset => (
                <th
                  key={asset}
                  className="px-4 py-2 bg-main text-white font-semibold"
                >
                  {asset.split('-')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset1, index1) => (
              <tr key={asset1}>
                <td
                  className={`px-4 py-2 bg-main ${
                    index1 === 0 ? 'border-t-0' : ''
                  } font-semibold`}
                >
                  {asset1.split('-')[0]}
                </td>
                {assets.map((asset2, index2) => {
                  const correlation =
                    asset1 === asset2
                      ? 1
                      : correlationMatrix[`${asset1}/${asset2}`] ??
                        correlationMatrix[`${asset2}/${asset1}`];

                  const cellColor = getColorForCorrelation(correlation);

                  return (
                    <td
                      style={{
                        backgroundColor: cellColor
                      }}
                      key={asset2}
                      className={
                        'px-4 py-2 w-218 h-10 text-white' +
                        (index2 === 0 ? ' border-l-0' : '')
                      }
                    >
                      {correlation?.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
