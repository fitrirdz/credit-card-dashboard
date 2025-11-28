'use client';

import { ArrowUpRight, ArrowDownLeft, RotateCw } from 'lucide-react';
import { useCreditContext } from '@/contexts/credit-context';

export function RecentTransactions() {
  const { transactions } = useCreditContext();
  
  const handleRefresh = () => {
    // Refresh logic here
    console.log('Refreshing transactions...');
  };

  return (
    <div className='rounded-xl border border-border bg-card shadow-sm'>
      <div className='border-b border-border p-6 flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-foreground'>
          Recent Transactions
        </h2>
        <button
          onClick={handleRefresh}
          className='text-muted-foreground hover:text-foreground transition-colors'
        >
          <RotateCw className='h-5 w-5' />
        </button>
      </div>
      <div className='divide-y divide-border'>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className='p-6 hover:bg-secondary/50 transition-colors'
          >
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-3'>
                <div
                  className={`rounded-full p-2 ${
                    transaction.type === 'credit'
                      ? 'bg-green-100'
                      : 'bg-secondary'
                  }`}
                >
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className='h-4 w-4 text-green-600' />
                  ) : (
                    <ArrowUpRight className='h-4 w-4 text-foreground' />
                  )}
                </div>
                <p className='font-medium text-foreground'>
                  {transaction.merchant}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  transaction.type === 'credit'
                    ? 'text-green-600'
                    : 'text-foreground'
                }`}
              >
                {transaction.type === 'credit' ? '+' : '-'}Rp{' '}
                {transaction.amount.toLocaleString('id-ID')}
              </p>
            </div>
            <div className='flex items-center justify-between pl-11'>
              <p className='text-xs text-muted-foreground'>
                {transaction.id}
              </p>
              <p className='text-xs text-muted-foreground'>
                {transaction.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='border-t border-border p-6 text-center'>
        <button className='text-sm font-medium text-accent hover:text-accent/80 transition-colors'>
          View All Transactions
        </button>
      </div>
    </div>
  );
}
