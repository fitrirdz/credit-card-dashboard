export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Card Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your credit card and spending</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Premium Card</p>
          </div>
        </div>
      </div>
    </header>
  )
}
