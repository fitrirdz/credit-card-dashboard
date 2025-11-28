import { CreditCard } from "@/components/credit-card"
import { SpendingSummary } from "@/components/spending-summary"
import { RecentTransactions } from "@/components/recent-transactions"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-6 md:gap-8">
          {/* Credit Card Section */}
          <CreditCard />

          {/* Spending Summary and Transactions Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SpendingSummary />
            </div>
            <div className="lg:col-span-2">
              <RecentTransactions />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
