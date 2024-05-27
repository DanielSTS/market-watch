export async function createBacktest(backtestData: any) {
  try {
    const response = await fetch('http://localhost:3001/backtests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(backtestData)
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Backtest submetido com sucesso:', data);
    } else {
      console.error('Erro ao submeter o backtest:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao submeter o backtest:', error);
  }
}
