'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BacktestDetails from '../BacktestDetails';

const schema = z.object({
  cryptocurrency: z.string().min(1, { message: 'Selecione uma criptomoeda' }),
  strategy: z.string().min(1, { message: 'Selecione uma estratégia' }),
  startDate: z.date(),
  endDate: z.date()
});

type FormValues = z.infer<typeof schema>;

export default function Backtest() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between items-start">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-3 p-8">
          <div className="mb-4">
            <label htmlFor="cryptocurrency" className="block mb-2">
              Criptomoeda
            </label>
            <select
              id="cryptocurrency"
              {...register('cryptocurrency')}
              className={`w-full border rounded p-2 ${
                errors.cryptocurrency ? 'border-red-500' : ''
              }`}
            >
              <option value="">Selecione uma criptomoeda</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
            </select>
            {errors.cryptocurrency && (
              <span className="text-red-500">
                {errors.cryptocurrency.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="strategy" className="block mb-2">
              Estratégia
            </label>
            <select
              id="strategy"
              {...register('strategy')}
              className={`w-full border rounded p-2 ${
                errors.strategy ? 'border-red-500' : ''
              }`}
            >
              <option value="">Selecione uma estratégia</option>
              <option value="bollinger">Bandas de Bollinger</option>
              <option value="rsi">RSI (Índice de Força Relativa)</option>
            </select>
            {errors.strategy && (
              <span className="text-red-500">{errors.strategy.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block mb-2">
              Data de Início
            </label>
            <input
              type="date"
              id="startDate"
              {...register('startDate')}
              className={`border rounded p-2 ${
                errors.startDate ? 'border-red-500' : ''
              }`}
            />
            {errors.startDate && (
              <span className="text-red-500">{errors.startDate.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block mb-2">
              Data de Fim
            </label>
            <input
              type="date"
              id="endDate"
              {...register('endDate')}
              className={`border rounded p-2 ${
                errors.endDate ? 'border-red-500' : ''
              }`}
            />
            {errors.endDate && (
              <span className="text-red-500">{errors.endDate.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-8 rounded hover:bg-blue-600 m-10  "
          >
            Executar Backtest
          </button>
        </form>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Backtests Existents</h2>
        <BacktestDetails />
      </div>
    </div>
  );
}
