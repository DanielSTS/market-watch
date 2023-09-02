type ChartProps = {
  prices: number[];
  width: number;
  height: number;
  isHigh: boolean;
};

export default function generateChartSvg({
  prices,
  width,
  height,
  isHigh
}: ChartProps) {
  const maxY = Math.max(...prices);
  const minY = Math.min(...prices);
  const xStep = width / (prices.length - 1);

  const points = prices
    .map(
      (price, index) =>
        `${index * xStep},${height - ((price - minY) / (maxY - minY)) * height}`
    )
    .join(' ');

  const gradientId = `chartGradient-${isHigh ? 'high' : 'low'}`;

  const color = isHigh ? '#0FAE96' : '#AE0000';

  const colorGradient = isHigh ? '#0FAE9611' : '#AE000011';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={colorGradient} />
          <stop offset="90%" stopColor={color} />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1" />
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
