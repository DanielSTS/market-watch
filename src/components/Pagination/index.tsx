import { Dispatch, SetStateAction, useEffect } from 'react';

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

type PaginationProps = {
  limit: number;
  total: number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function Pagination({
  limit,
  total,
  offset,
  setOffset
}: PaginationProps) {
  const pages = Math.ceil(total / limit);
  const current = offset ? offset / limit + 1 : 1;
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(Math.max(current - MAX_LEFT, 1), maxFirst);

  useEffect(() => {
    if (current > pages) {
      onPageChange(1);
    }
  }, [current, pages]);
  function onPageChange(page: number) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className="flex flex-wrap items-center gap-2 sm:justify-end">
      <li>
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          className="rounded bg-zinc-300 px-3 py-1 text-zinc-700 hover:bg-zinc-400 hover:transition hover:duration-300 disabled:bg-zinc-500 disabled:text-zinc-900"
        >
          {'<'}
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map(page => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 ${
                page === current
                  ? 'bg-greenMain text-white'
                  : 'bg-zinc-300 text-zinc-700'
              } rounded hover:bg-greenHover hover:text-white hover:transition hover:duration-300`}
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
          className="rounded bg-zinc-300 px-3 py-1 text-zinc-700 hover:bg-zinc-400 hover:transition hover:duration-300 disabled:bg-zinc-500 disabled:text-zinc-900"
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
}
