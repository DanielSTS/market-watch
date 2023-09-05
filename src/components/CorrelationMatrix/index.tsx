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
    const shadesOfGreen = [
      'bg-green-500',
      'bg-green-600',
      'bg-green-700',
      'bg-green-800',
      'bg-green-900'
    ];

    const shadesOfRed = [
      'bg-red-500',
      'bg-red-600',
      'bg-red-700',
      'bg-red-800',
      'bg-red-900'
    ];

    if (correlation >= -1 && correlation <= 1) {
      if (correlation >= 0) {
        const index = Math.floor(correlation * shadesOfGreen.length);
        return shadesOfGreen[index];
      } else {
        const index = Math.floor(Math.abs(correlation) * shadesOfRed.length);
        return shadesOfRed[index];
      }
    } else {
      return 'bg-gray-300';
    }
  }

  return (
    <section className="py-12 flex items-center justify-center">
      <div className="overflow-x-auto rounded-md border border-zinc-800">
        <table className="table-fixed rounded-lg text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-main text-white font-semibold"></th>
              {assets.map(asset => (
                <th
                  key={asset}
                  className="px-4 py-2 bg-main text-white font-medium"
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
                  className={`px-2 py-2 bg-main ${
                    index1 === 0 ? 'border-t-0' : ''
                  } font-medium`}
                >
                  {asset1.split('-')[0]}
                </td>
                {assets.map((asset2, index2) => {
                  const correlation =
                    asset1 === asset2
                      ? 1
                      : correlationMatrix[`${asset1}/${asset2}`] ??
                        correlationMatrix[`${asset2}/${asset1}`];

                  return (
                    <td
                      key={asset2}
                      className={
                        'px-4 py-2 w-20 h-10 text-white' +
                        (index2 === 0 ? ' border-l-0 ' : '  ') +
                        getColorForCorrelation(correlation) +
                        ' hover:bg-opacity-70 hover:shadow-lg'
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
