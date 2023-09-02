import { Dispatch, SetStateAction } from 'react';

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
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(Math.max(current - MAX_LEFT, 1), maxFirst);

  function onPageChange(page: number) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className="flex sm:justify-end items-center gap-2 flex-wrap">
      <li>
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          className="px-3 py-1 bg-zinc-300 text-zinc-700 rounded hover:bg-zinc-400 hover:transition hover:duration-300 disabled:bg-zinc-600 disabled:text-zinc-900"
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
                  ? 'bg-green text-white'
                  : 'bg-zinc-300 text-zinc-700'
              } hover:bg-greenHover hover:text-white rounded hover:transition hover:duration-300`}
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
          className="px-3 py-1 bg-zinc-300 text-zinc-700 rounded hover:bg-zinc-400 hover:transition hover:duration-300 disabled:bg-zinc-600 disabled:text-zinc-900"
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
}
