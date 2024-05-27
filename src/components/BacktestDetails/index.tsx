import React from 'react';
import backtestData from './data.json';

const BacktestDetails = () => {
  const renderDetails = () => {
    return Object.entries(backtestData).map(([key, value]) => {
      if (key.startsWith('_')) {
        return null;
      }
      const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();

      return (
        <tr key={key}>
          <td className="font-semibold">{formattedKey}:</td>
          <td>
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Detalhes do Backtest</h2>
      <div className="overflow-x-auto">
        <table className="table-auto">
          <tbody>{renderDetails()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default BacktestDetails;
