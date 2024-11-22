"use client"

import * as React from "react"
import {
  ArrowRightFromLine,
  LockIcon,
  RefreshCw,
  UnlockIcon,
} from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Sample data for the vesting chart
const vestingData = [
  { month: "Jan", tokens: 1000 },
  { month: "Feb", tokens: 2000 },
  { month: "Mar", tokens: 3000 },
  { month: "Apr", tokens: 4000 },
  { month: "May", tokens: 5000 },
  { month: "Jun", tokens: 6000 },
]

export default function VestingDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Sample values - replace with actual data from your Web3 integration
  const tokenPrice = 1.23
  const apy = 12.5
  const amountLocked = 5000
  const amountUnlockable = 1000

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative z-10 w-full rounded-none border-l border-[#242424] bg-[#0a0a0a] py-4 font-mono text-white/80 transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white"
        >
          WITHDRAW
        </button>
        <div className="pointer-events-none absolute inset-0 z-0 h-full py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute left-0 top-0 size-4 border-l-2 border-t-2 border-lime-300" />
          <div className="absolute right-0 top-0 size-4 border-r-2 border-t-2 border-lime-300" />
          <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-lime-300" />
          <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-lime-300" />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader className="space-y-4">
          <SheetTitle>Token Vesting Dashboard</SheetTitle>
          <SheetDescription>
            View your vesting schedule and manage your tokens
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Token Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">
                  Token Price
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">${tokenPrice}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">
                  Restaking APY
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-green-500">{apy}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <LockIcon className="size-4" />
                  Amount Locked
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">
                  {amountLocked.toLocaleString()} Tokens
                </p>
                <p className="text-sm text-gray-500">
                  ${(amountLocked * tokenPrice).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <UnlockIcon className="size-4" />
                  Unlockable
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">
                  {amountUnlockable.toLocaleString()} Tokens
                </p>
                <p className="text-sm text-muted-foreground">
                  ${(amountUnlockable * tokenPrice).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Vesting Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Vesting Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vestingData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="tokens"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              className="flex-1"
              onClick={() => console.log("Withdraw clicked")}
            >
              <UnlockIcon className="mr-2 size-4" />
              Withdraw Available
            </Button>
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => console.log("Restake clicked")}
            >
              <RefreshCw className="mr-2 size-4" />
              Restake ({apy}% APY)
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
