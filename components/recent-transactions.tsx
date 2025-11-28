import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  type: "debit" | "credit"
  category: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    merchant: "Starbucks Coffee",
    amount: 59900,
    date: "Today",
    type: "debit",
    category: "Food & Drink",
  },
  {
    id: "2",
    merchant: "Netflix Subscription",
    amount: 159900,
    date: "Nov 24",
    type: "debit",
    category: "Entertainment",
  },
  {
    id: "3",
    merchant: "Amazon Purchase",
    amount: 875000,
    date: "Nov 23",
    type: "debit",
    category: "Shopping",
  },
  {
    id: "4",
    merchant: "Paycheck Deposit",
    amount: 35000000,
    date: "Nov 22",
    type: "credit",
    category: "Income",
  },
  {
    id: "5",
    merchant: "Gym Membership",
    amount: 499900,
    date: "Nov 21",
    type: "debit",
    category: "Health",
  },
  {
    id: "6",
    merchant: "Shell Gas Station",
    amount: 624500,
    date: "Nov 20",
    type: "debit",
    category: "Transport",
  },
  {
    id: "7",
    merchant: "Uber Eats",
    amount: 287500,
    date: "Nov 19",
    type: "debit",
    category: "Food & Drink",
  },
]

export function RecentTransactions() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-secondary/50 transition-colors">
            {/* First row: Transaction name and amount */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${transaction.type === "credit" ? "bg-green-100" : "bg-secondary"}`}>
                  {transaction.type === "credit" ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-foreground" />
                  )}
                </div>
                <p className="font-medium text-foreground">{transaction.merchant}</p>
              </div>
              <p className={`font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-foreground"}`}>
                {transaction.type === "credit" ? "+" : "-"}Rp {transaction.amount.toLocaleString("id-ID")}
              </p>
            </div>
            {/* Second row: Transaction ID and date */}
            <div className="flex items-center justify-between pl-11">
              <p className="text-xs text-muted-foreground">ID: {transaction.id}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-6 text-center">
        <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  )
}
