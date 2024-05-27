export default async function BacktestDetails() {
  const backtestData = await fetch('http://localhost:3001/backtests', {
    next: { revalidate: 5000 }
  }).then(response => response.json());
  console.log('teste', backtestData);
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Backtests</h2>
      <div className="overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">StartTime</th>
              <th className="px-4 py-2">EndTime</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Exchange</th>
              <th className="px-4 py-2">Timeframe</th>
              <th className="px-4 py-2">StrategyType</th>
              <th className="px-4 py-2">State</th>
            </tr>
          </thead>
          <tbody>
            {backtestData.map((backtest: any) => (
              <tr key={backtest.id}>
                <td className="border px-4 py-2">{backtest.id}</td>
                <td className="border px-4 py-2">{backtest.startTime}</td>
                <td className="border px-4 py-2">{backtest.endTime}</td>
                <td className="border px-4 py-2">{backtest.symbol}</td>
                <td className="border px-4 py-2">{backtest.exchange}</td>
                <td className="border px-4 py-2">{backtest.timeframe}</td>
                <td className="border px-4 py-2">{backtest.strategyType}</td>
                <td className="border px-4 py-2">{backtest.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
