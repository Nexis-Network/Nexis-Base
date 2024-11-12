"use client"

import { Button } from "@/components/ui/button"

// Sample delegations data - replace with actual user delegations
const USER_DELEGATIONS = [
  {
    validatorName: "Validator 1",
    validatorKey: "0x1234...5678",
    amount: 1000,
    apy: 12.5,
    rewards: 125,
  },
  {
    validatorName: "Validator 2",
    validatorKey: "0x5678...9012",
    amount: 2000,
    apy: 11.8,
    rewards: 236,
  },
]

export default function DelegationsPage() {
  const handleUndelegate = (validatorKey: string) => {
    console.log(`Undelegating from ${validatorKey}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Delegations</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {USER_DELEGATIONS.map((delegation) => (
          <div
            key={delegation.validatorKey}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {delegation.validatorName}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {delegation.validatorKey}
              </p>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Staked Amount</span>
                <span className="font-medium">{delegation.amount} NZT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">APY</span>
                <span className="font-medium">{delegation.apy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rewards Earned</span>
                <span className="font-medium">{delegation.rewards} NZT</span>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleUndelegate(delegation.validatorKey)}
            >
              Undelegate
            </Button>
          </div>
        ))}

        {USER_DELEGATIONS.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            You have no active delegations.
          </div>
        )}
      </div>
    </div>
  )
}
