"use client"

import { useEffect, useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { useAccount } from "wagmi"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import {
  getLeaderboardData,
  type LeaderboardUser,
} from "@/app/actions/leaderboard"

const columns: ColumnDef<LeaderboardUser>[] = [
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => {
      const position: number = row.getValue("position")
      return <div className="w-[80px] text-center">{position}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "walletAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wallet" />
    ),
    cell: ({ row }) => {
      const address: string = row.getValue("walletAddress")
      const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`
      return <div className="font-medium">{truncated}</div>
    },
  },
  {
    accessorKey: "questsCompleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quests Completed" />
    ),
    cell: ({ row }) => {
      const quests: number = row.getValue("questsCompleted")
      return <div className="text-center">{quests}</div>
    },
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Points" />
    ),
    cell: ({ row }) => {
      const points: number = row.getValue("points")
      return (
        <div className="text-right font-medium">{points.toLocaleString()}</div>
      )
    },
  },
]

export default function Leaderboard() {
  const { address } = useAccount()
  const [data, setData] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const { users } = await getLeaderboardData()
        setData(users)
        setError(null)
      } catch (err) {
        setError("Failed to load leaderboard data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  if (loading) {
    return <DataTableSkeleton columnCount={4} rowCount={10} />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={data}
        filterFields={[
          {
            id: "walletAddress",
            label: "Search Wallet",
            placeholder: "Search by wallet address...",
          },
        ]}
      />
    </div>
  )
}
