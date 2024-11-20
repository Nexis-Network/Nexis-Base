import Link from "next/link"
import { DollarSign, Home, PieChart, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Nexis Dashboard</h1>
      </div>
      <nav className="mt-6">
        <Link
          href="/"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          <Home className="mr-3" size={20} />
          Dashboard
        </Link>
        <Link
          href="/delegate"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          <PieChart className="mr-3" size={20} />
          Delegate
        </Link>
        <Link
          href="/rewards"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          <DollarSign className="mr-3" size={20} />
          Rewards
        </Link>
        <Link
          href="/settings"
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          <Settings className="mr-3" size={20} />
          Settings
        </Link>
      </nav>
    </div>
  )
}
