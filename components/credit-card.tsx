'use client';

import { useState } from 'react';
import { Lock, Unlock, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useCreditContext } from '@/contexts/credit-context';

export function CreditCard() {
  const [isFrozen, setIsFrozen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [showFreezeConfirm, setShowFreezeConfirm] = useState(false);

  const { availableLimit, totalBill, totalSpending, getAvailableBalance, cardInfo } = useCreditContext();
  
  const { cardNumber, fullCardNumber, cvv, cardHolder, fullCardHolder, expiryDate } = cardInfo;

  const handleFreezeClick = () => {
    setShowFreezeConfirm(true);
  };

  const confirmFreeze = () => {
    setIsFrozen(!isFrozen);
    setShowFreezeConfirm(false);
  };

  // Calculate percentage used (based on totalBill + totalSpending)
  const totalUsed = totalBill + totalSpending;
  const percentUsed = (totalUsed / availableLimit) * 100;
  let barColor = 'bg-green-500';
  if (percentUsed <= 30) {
    barColor = 'bg-green-500';
  } else if (percentUsed > 30 && percentUsed <= 70) {
    barColor = 'bg-yellow-400';
  } else {
    barColor = 'bg-red-500';
  }

  // Check if eligible for limit increase (60% threshold)
  const canRequestIncrease = percentUsed >= 60;

  return (
    <div className='space-y-4'>
      {/* Credit Card */}
      <div
        className={`relative rounded-2xl p-8 text-white shadow-lg transition-all duration-300 ${
          isFrozen
            ? 'bg-gradient-to-br from-slate-400 to-slate-600'
            : 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
        }`}
      >
        {/* Card Header with Status */}
        <div className='flex items-start justify-between mb-12'>
          <div>
            <p className='text-sm font-semibold opacity-75'>CARD TYPE</p>
            <p className='text-lg font-bold'>VISA</p>
          </div>
          <div className='rounded-lg bg-white/10 px-3 py-1 backdrop-blur'>
            <span
              className={`text-xs font-semibold ${
                isFrozen ? 'text-orange-300' : 'text-green-300'
              }`}
            >
              {isFrozen ? 'FROZEN' : 'ACTIVE'}
            </span>
          </div>
        </div>
        <div className='flex items-start justify-between mb-8'>
          {/* Card Number with Eye Toggle */}
          <div>
            <div className='flex items-center gap-4 mb-2'>
              <p className='text-xs opacity-75'>CARD NUMBER</p>
              <button
                onClick={() => setIsCardVisible(!isCardVisible)}
                className='text-white/60 hover:text-white transition-colors'
                disabled={isFrozen}
              >
                {isCardVisible ? (
                  <Eye className='h-4 w-4' />
                ) : (
                  <EyeOff className='h-4 w-4' />
                )}
              </button>
            </div>
            <p className='text-xl font-mono tracking-wider'>
              {isCardVisible ? fullCardNumber : cardNumber}
            </p>
          </div>

          {/* CVV */}
          <div>
            <p className='text-xs opacity-75 text-right'>CVV</p>
            <p className='text-xl font-mono tracking-wider'>
              {isCardVisible ? cvv : '•••'}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className='flex items-end justify-between'>
          <div>
            <p className='text-xs opacity-75'>CARD HOLDER</p>
            <p className='font-semibold font-mono tracking-wider uppercase'>
              {isCardVisible ? fullCardHolder : cardHolder}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-xs opacity-75'>EXPIRES</p>
            <p className='font-mono text-lg'>{expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Card Details Grid */}
      <div className='grid gap-4 md:grid-cols-2'>
        {/* Available Limit */}
        <div className='rounded-xl border border-border bg-card p-6 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>
            Available Limit
          </p>
          <p className='mt-2 text-3xl font-bold text-foreground'>
            Rp {getAvailableBalance().toLocaleString('id-ID')}
          </p>
          <div className='mt-4 h-2 w-full rounded-full bg-secondary'>
            <div
              className={`h-full rounded-full ${barColor} transition-all`}
              style={{
                width: `${percentUsed.toFixed(0)}%`,
              }}
            />
          </div>
          <p className='mt-2 text-xs text-muted-foreground'>
            {percentUsed.toFixed(0)}% of Rp{' '}
            {availableLimit.toLocaleString('id-ID')} used
          </p>
        </div>

        {/* Total Bill */}
        <div className='rounded-xl border border-border bg-card p-6 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>
            Total Bill November 2025
          </p>
          <p className='mt-2 text-3xl font-bold text-blue-700'>
            Rp {totalBill.toLocaleString('id-ID')}
          </p>
          <p className='mt-4 text-xs text-muted-foreground font-bold'>
            Due by Dec 2, 2025
          </p>
          <button className='mt-4 w-full rounded-lg bg-blue-700 py-2 font-medium text-white hover:bg-blue-800 transition-colors'>
            Pay Now
          </button>
        </div>
      </div>

      {/* Freeze Toggle */}
      <div className='flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm'>
        <div className='flex items-center gap-3'>
          {isFrozen ? (
            <Lock className='h-5 w-5 text-accent' />
          ) : (
            <Unlock className='h-5 w-5 text-accent' />
          )}
          <div>
            <p className='font-medium text-foreground'>Card Status</p>
            <p className='text-sm text-muted-foreground'>
              {isFrozen
                ? 'Card is currently frozen'
                : 'Card is active and ready to use'}
            </p>
          </div>
        </div>
        <button
          onClick={handleFreezeClick}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            isFrozen
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-accent text-white hover:bg-red-700'
          }`}
        >
          {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
        </button>
      </div>

      <div className='rounded-xl border border-border bg-card p-4 shadow-sm'>
        <div className='flex items-start gap-3'>
          <TrendingUp
            className={`h-5 w-5 shrink-0 mt-0.5 ${
              canRequestIncrease ? 'text-green-600' : 'text-muted-foreground'
            }`}
          />
          <div className='flex-1'>
            <p className='font-medium text-foreground mb-1'>
              Request Limit Increase
            </p>
            {!canRequestIncrease && (
              <p className='text-xs text-muted-foreground mb-3'>
                You need to reach at least 60% usage of your current limit to
                request an increase.
              </p>
            )}
            <button
              className={`w-full rounded-lg py-2.5 font-medium transition-colors ${
                canRequestIncrease
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-secondary text-muted-foreground cursor-not-allowed'
              }`}
              disabled={!canRequestIncrease}
            >
              {canRequestIncrease ? 'Request Increase' : 'Not Eligible Yet'}
            </button>
          </div>
        </div>
      </div>

      {showFreezeConfirm && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg'>
          <div className='bg-card rounded-xl p-6 shadow-lg max-w-sm mx-4 border border-border'>
            <h3 className='text-lg font-semibold text-foreground mb-2'>
              {isFrozen ? 'Unfreeze Card?' : 'Freeze Card?'}
            </h3>
            <p className='text-sm text-muted-foreground mb-6'>
              {isFrozen
                ? "Are you sure you want to unfreeze your card? You'll be able to use it for transactions."
                : "Are you sure you want to freeze your card? You won't be able to use it for any transactions."}
            </p>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setShowFreezeConfirm(false)}
                className='px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary/50 transition-colors font-medium'
              >
                Cancel
              </button>
              <button
                onClick={confirmFreeze}
                className={`px-4 py-2 rounded-lg font-medium text-white transition-colors ${
                  isFrozen
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {isFrozen ? 'Unfreeze' : 'Freeze'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
