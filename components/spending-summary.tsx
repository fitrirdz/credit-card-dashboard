'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useCreditContext } from '@/contexts/credit-context';

export function SpendingSummary() {
  const { totalSpending, spendingData } = useCreditContext();
  const avgSpending = Math.round(totalSpending / spendingData.length);

  // Format large numbers to shorter format (e.g., 1M, 1.5M)
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className='space-y-6'>
      {/* Summary Stats */}
      <div className='rounded-xl border border-border bg-card p-6 shadow-sm'>
        <p className='text-sm font-medium text-muted-foreground'>
          Total Spending This Month
        </p>
        <p className='mt-2 text-4xl font-bold text-foreground'>
          Rp {totalSpending.toLocaleString('id-ID')}
        </p>
        <div className='mt-4 space-y-3'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Average weekly</span>
            <span className='font-semibold text-foreground'>
              Rp {avgSpending.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className='rounded-xl border border-border bg-card p-6 shadow-sm'>
        <p className='mb-4 font-semibold text-foreground'>Weekly Breakdown</p>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart data={spendingData} margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='var(--color-border)' />
            <XAxis
              dataKey='name'
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              tick={{ fill: 'var(--color-muted-foreground)' }}
              tickFormatter={formatYAxis}
              width={60}
              label={{
                value: 'Amount (Rp)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'var(--color-foreground)' }}
              formatter={(value) =>
                `Rp ${(value as number).toLocaleString('id-ID')}`
              }
            />
            <Bar
              dataKey='spending'
              fill='var(--color-primary)'
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
