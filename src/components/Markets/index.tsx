export default function Markets() {
  return (
    <section
      id={'markets'}
      className="bg-background flex items-center justify-center py-16"
    >
      <div className={'bg-main-color h-96 w-3/5 rounded-xl'}>
        <div className={'flex gap-4 p-4'}>
          <button
            className={
              'text-zinc-700 border border-zinc-700 rounded-lg p-2 text-sm'
            }
          >
            Top Gainer
          </button>
          <button
            className={
              'text-zinc-700 border border-zinc-700 rounded-lg p-2 text-sm'
            }
          >
            Top Loser
          </button>
          <button
            className={
              'text-zinc-700 border border-zinc-700 rounded-lg p-2 text-sm'
            }
          >
            New in Market
          </button>
          <button
            className={
              'text-zinc-700 border border-zinc-700 rounded-lg p-2 text-sm'
            }
          >
            Top in Volume
          </button>
        </div>
      </div>
    </section>
  );
}
