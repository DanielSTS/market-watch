'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createBacktest } from '@/actions/create-backtest';

const schema = z.object({
  exchange: z.string().min(1, { message: 'Selecione uma exchange' }),
  symbol: z.string().min(1, { message: 'Selecione uma criptomoeda' }),
  strategyType: z.string().min(1, { message: 'Selecione uma estratégia' }),
  timeframe: z.string().min(1, { message: 'Selecione um timeframe' }),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
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

  async function onSubmit(data: FormValues) {
    await createBacktest(data);
  }

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center gap-3 p-8"
      >
        <div className="">
          <label htmlFor="exchange" className="mb-2 block">
            Exchange
          </label>
          <select
            id="exchange"
            {...register('exchange')}
            className={`w-full rounded border p-2 ${
              errors.exchange ? 'border-red-500' : ''
            }`}
          >
            <option value="">Selecione uma exchange</option>
            <option value="foxbit">Foxbit</option>
            <option value="binance">Binance</option>
          </select>
          {errors.exchange && (
            <span className="text-red-500">{errors.exchange.message}</span>
          )}
        </div>
        <div className="">
          <label htmlFor="symbol" className="mb-2 block">
            Criptomoeda
          </label>
          <select
            id="symbol"
            {...register('symbol')}
            className={`w-full rounded border p-2 ${
              errors.symbol ? 'border-red-500' : ''
            }`}
          >
            <option value="">Selecione uma criptomoeda</option>
            <option value="btcbrl">Bitcoin (BTC)</option>
            <option value="ethbrl">Ethereum (ETH)</option>
          </select>
          {errors.symbol && (
            <span className="text-red-500">{errors.symbol.message}</span>
          )}
        </div>
        <div className="">
          <label htmlFor="strategyType" className="mb-2 block">
            Estratégia
          </label>
          <select
            id="strategyType"
            {...register('strategyType')}
            className={`w-full rounded border p-2 ${
              errors.strategyType ? 'border-red-500' : ''
            }`}
          >
            <option value="">Selecione uma estratégia</option>
            <option value="bollinger-bands">Bandas de Bollinger</option>
            <option value="rsi">RSI (Índice de Força Relativa)</option>
          </select>
          {errors.strategyType && (
            <span className="text-red-500">{errors.strategyType.message}</span>
          )}
        </div>
        <div className="">
          <label htmlFor="timeframe" className="mb-2 block">
            Timeframe
          </label>
          <select
            id="timeframe"
            {...register('timeframe')}
            className={`w-full rounded border p-2 ${
              errors.timeframe ? 'border-red-500' : ''
            }`}
          >
            <option value="">Selecione um timeframe</option>
            <option value="1m">1m</option>
            <option value="1h">1h</option>
          </select>
          {errors.timeframe && (
            <span className="text-red-500">{errors.timeframe.message}</span>
          )}
        </div>
        <div className="">
          <label htmlFor="startTime" className="mb-2 block">
            Data de Início
          </label>
          <input
            type="date"
            id="startTime"
            {...register('startTime')}
            className={`rounded border p-1 ${
              errors.startTime ? 'border-red-500' : ''
            }`}
          />
          {errors.startTime && (
            <span className="text-red-500">{errors.startTime.message}</span>
          )}
        </div>
        <div className="">
          <label htmlFor="endTime" className="mb-2 block">
            Data de Fim
          </label>
          <input
            type="date"
            id="endTime"
            {...register('endTime')}
            className={`rounded border p-1 ${
              errors.endTime ? 'border-red-500' : ''
            }`}
          />
          {errors.endTime && (
            <span className="text-red-500">{errors.endTime.message}</span>
          )}
        </div>

        <div className="">
          <button
            type="submit"
            className="mt-8 rounded bg-blue-500 p-4 text-white hover:bg-blue-600"
          >
            Executar Backtest
          </button>
        </div>
      </form>
    </div>
  );
}
