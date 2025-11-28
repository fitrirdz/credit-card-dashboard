'use client';

import { createContext, useContext, ReactNode } from 'react';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
  category: string;
}

interface CreditContextType {
  availableLimit: number;
  totalBill: number;
  totalSpending: number;
  spendingData: { name: string; spending: number }[];
  transactions: Transaction[];
  cardInfo: {
    cardNumber: string;
    fullCardNumber: string;
    cvv: string;
    cardHolder: string;
    fullCardHolder: string;
    expiryDate: string;
  };
  getAvailableBalance: () => number;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export function CreditProvider({ children }: { children: ReactNode }) {
  // Card information
  const cardInfo = {
    cardNumber: '4532 •••• •••• 9901',
    fullCardNumber: '4532 1234 5678 9901',
    cvv: '123',
    cardHolder: '•••• •••• ••••',
    fullCardHolder: 'Fitri Ratna Dewi',
    expiryDate: '12/26',
  };

  // Financial data
  const availableLimit = 15000000;
  const totalBill = 4250000;

  // Spending data
  const spendingData = [
    { name: 'Week 1', spending: 820000 },
    { name: 'Week 2', spending: 1100000 },
    { name: 'Week 3', spending: 900000 },
    { name: 'Week 4', spending: 1230000 },
  ];

  const totalSpending = spendingData.reduce(
    (sum, week) => sum + week.spending,
    0
  );

  // Transactions
  const transactions: Transaction[] = [
    {
      id: 'TRX5K9M2NLPQ',
      merchant: 'SuperIndi',
      amount: 310000,
      date: '28 Nov 2025',
      type: 'debit',
      category: 'Groceries',
    },
    {
      id: 'TRX8H3W7XFZR',
      merchant: 'Greb - Jakarta',
      amount: 45000,
      date: '27 Nov 2025',
      type: 'debit',
      category: 'Transport',
    },
    {
      id: 'TRX2V6N4DPKT',
      merchant: 'Tokopaedi',
      amount: 350000,
      date: '26 Nov 2025',
      type: 'debit',
      category: 'Shopping',
    },
    {
      id: 'TRX9L1Y8JMBC',
      merchant: 'Notflex Indonesia',
      amount: 186000,
      date: '25 Nov 2025',
      type: 'debit',
      category: 'Entertainment',
    },
    {
      id: 'TRX4P7Q3RTHW',
      merchant: 'Stirbacks Plaza Senayan',
      amount: 89000,
      date: '24 Nov 2025',
      type: 'debit',
      category: 'Food & Drink',
    },
    {
      id: 'TRX6F2B9VXGM',
      merchant: 'Shall SPBU Sudirman',
      amount: 250000,
      date: '23 Nov 2025',
      type: 'debit',
      category: 'Transport',
    },
    {
      id: 'TRX1C8D5SKYN',
      merchant: 'GoEat - Sushi Tei',
      amount: 175000,
      date: '22 Nov 2025',
      type: 'debit',
      category: 'Food & Drink',
    },
    {
      id: 'TRX3A4Z7HQLE',
      merchant: 'Shopyy Payment',
      amount: 420000,
      date: '21 Nov 2025',
      type: 'debit',
      category: 'Shopping',
    },
  ];

  const getAvailableBalance = () => {
    return availableLimit - totalBill - totalSpending;
  };

  return (
    <CreditContext.Provider
      value={{
        availableLimit,
        totalBill,
        totalSpending,
        spendingData,
        transactions,
        cardInfo,
        getAvailableBalance,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
}

export function useCreditContext() {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCreditContext must be used within a CreditProvider');
  }
  return context;
}
