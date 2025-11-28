'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const spendingData = [
  { name: "Week 1", spending: 820000 },
  { name: "Week 2", spending: 1200000 },
  { name: "Week 3", spending: 950000 },
  { name: "Week 4", spending: 1280000 },
]

export function SpendingSummary() {
  const totalSpending = spendingData.reduce((sum, week) => sum + week.spending, 0)
  const avgSpending = Math.round(totalSpending / spendingData.length)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Total Spending This Month</p>
        <p className="mt-2 text-4xl font-bold text-foreground">Rp {totalSpending.toLocaleString("id-ID")}</p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average weekly</span>
            <span className="font-semibold text-foreground">Rp {avgSpending.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget remaining</span>
            <span className="font-semibold text-green-600">Rp 5.750.000</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-4 font-semibold text-foreground">Weekly Breakdown</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={spendingData} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" tick={{ fill: "var(--color-muted-foreground)" }} />
            <YAxis
              tick={{ fill: "var(--color-muted-foreground)" }}
              label={{ value: "Amount (Rp)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              formatter={(value) => `Rp ${(value as number).toLocaleString("id-ID")}`}
            />
            <Bar dataKey="spending" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
