"use client"

import { selectUserSlice } from "@/store/userSlice"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { useSelector } from "react-redux"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function UnlockChart() {
  const { walletData } = useSelector(selectUserSlice)

  if (!walletData) return null

  const { vestedNZT, estDailyUnlocked, totalNZT, vestingPeriod, unlockedNZT } =
    walletData

  // Convert string values to numbers
  const vestedAmount = parseFloat(vestedNZT)
  const dailyUnlock = parseFloat(estDailyUnlocked)
  const totalAmount = parseFloat(totalNZT)
  const vestingMonths = parseFloat(vestingPeriod)
  const unlockedAmount = parseFloat(unlockedNZT)

  // Generate data points for 12 months
  const labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)
  const dataPoints = Array.from({ length: 12 }, (_, i) => {
    const monthlyUnlock = dailyUnlock * 30 // Approximate days per month
    const projectedUnlock = unlockedAmount + monthlyUnlock * (i + 1)
    return Math.min(projectedUnlock, totalAmount)
  })

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Unlocked NZT",
        data: dataPoints,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "NZT Unlock Schedule",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y
            return `${value.toLocaleString()} NZT`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "NZT Amount",
        },
        ticks: {
          callback: (value) => {
            return typeof value === "number" ? value.toLocaleString() : value
          },
        },
      },
    },
  }

  return (
    <div className="w-full p-4 bg-[#F2F4F3] rounded-lg shadow-lg">
      <Line options={options} data={data} />
    </div>
  )
}
