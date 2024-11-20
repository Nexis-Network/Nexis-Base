/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import { useAccount } from "wagmi"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import styles from "./staking.module.css"

type StatItemProps = {
  title: string
  value: string | number
  isLoading: boolean
}

const StatItem = ({ title, value, isLoading }: StatItemProps) => (
  <div className={styles.column}>
    <div className={styles.columns}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className={styles.valueText}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex grow items-end">
        {isLoading ? (
          <Skeleton className="h-10 w-[100px]" />
        ) : (
          <div className={styles.headerText}>{value}</div>
        )}
      </CardContent>
    </div>
  </div>
)

export default function NZTStats() {
  const { isConnected } = useAccount()

  // Placeholder data - replace with actual data fetching logic
  const stats = {
    ActivelyStaked: "1,000,000 NZT",
    UpcomingRewards: "5,000 NZT",
    UnstakedAvailable: "50,000 NZT",
    Validating: "10 Validators",
    Delegating: "5 Delegations",
    TotalHistoricalRewards: "100,000 NZT",
  }

  return (
    <div className="container mx-auto min-w-full p-1">
      <div className="mb-6 flex items-center justify-between px-2">
        <h2 className={styles.DescriptionText}>/// NZT Statistics</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="rounded-full bg-white px-4 py-2 text-sm text-black hover:bg-white">
              Delegate NZT
            </button>
          </div>
          <div>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="rounded-full bg-white px-4 py-2 text-sm text-black hover:bg-white">
              Withdraw NZT
            </button>
          </div>
        </div>
      </div>
      <div
        className="grid w-full grid-cols-6 justify-items-center gap-2"
        style={{
          backgroundColor: "rgb(26, 26, 28)",
          color: "rgb(248, 248, 251)",
          boxShadow: "none",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))",
          transition: "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="border-none bg-transparent shadow-none">
            <StatItem
              title={key.split(/(?=[A-Z])/).join(" ")}
              value={value}
              isLoading={!isConnected}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}
