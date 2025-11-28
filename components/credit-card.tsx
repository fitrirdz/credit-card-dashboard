"use client"

import { useState } from "react"
import { Lock, Unlock, TrendingUp } from "lucide-react"

export function CreditCard() {
  const [isFrozen, setIsFrozen] = useState(false)

  const cardNumber = "4532 •••• •••• 9901"
  const cardHolder = "Fitri Ratna Dewi"
  const expiryDate = "12/26"
  const availableLimit = 15000000
  const currentBalance = 4250000

  const toggleFreeze = () => {
    setIsFrozen(!isFrozen)
  }

  return (
    <div className="space-y-4">
      {/* Credit Card */}
      <div
        className={`relative rounded-2xl p-8 text-white shadow-lg transition-all duration-300 ${
          isFrozen
            ? "bg-gradient-to-br from-slate-400 to-slate-600"
            : "bg-gradient-to-br from-slate-800 via-slate-900 to-black"
        }`}
      >
        {/* Card Header with Status */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-sm font-semibold opacity-75">CARD TYPE</p>
            <p className="text-lg font-bold">VISA</p>
          </div>
          <div className="rounded-lg bg-white/10 px-3 py-1 backdrop-blur">
            <span className={`text-xs font-semibold ${isFrozen ? "text-orange-300" : "text-green-300"}`}>
              {isFrozen ? "FROZEN" : "ACTIVE"}
            </span>
          </div>
        </div>

        {/* Card Number */}
        <div className="mb-8">
          <p className="mb-2 text-xs opacity-75">CARD NUMBER</p>
          <p className="text-xl font-mono tracking-wider">{cardNumber}</p>
        </div>

        {/* Card Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs opacity-75">CARD HOLDER</p>
            <p className="font-semibold">{cardHolder}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-75">EXPIRES</p>
            <p className="font-mono text-lg">{expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Card Details Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Available Limit */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Available Limit</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            Rp {(availableLimit - currentBalance).toLocaleString("id-ID")}
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{
                width: `${((currentBalance / availableLimit) * 100).toFixed(0)}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {((currentBalance / availableLimit) * 100).toFixed(0)}% of Rp {availableLimit.toLocaleString("id-ID")} used
          </p>
        </div>

        {/* Current Balance */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
          <p className="mt-2 text-3xl font-bold text-accent">Rp {currentBalance.toLocaleString("id-ID")}</p>
          <p className="mt-4 text-xs text-muted-foreground">Due by Dec 20, 2024</p>
          <button className="mt-4 w-full rounded-lg bg-accent py-2 font-medium text-accent-foreground hover:bg-accent/90 transition-colors">
            Pay Now
          </button>
        </div>
      </div>

      {/* Freeze Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          {isFrozen ? <Lock className="h-5 w-5 text-accent" /> : <Unlock className="h-5 w-5 text-accent" />}
          <div>
            <p className="font-medium text-foreground">Card Status</p>
            <p className="text-sm text-muted-foreground">
              {isFrozen ? "Card is currently frozen" : "Card is active and ready to use"}
            </p>
          </div>
        </div>
        <button
          onClick={toggleFreeze}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            isFrozen
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          }`}
        >
          {isFrozen ? "Unfreeze Card" : "Freeze Card"}
        </button>
      </div>

      <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-card p-4 font-medium text-accent hover:bg-secondary/50 transition-colors">
        <TrendingUp className="h-5 w-5" />
        Request Increase Limit
      </button>
    </div>
  )
}
