import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { getBenchmarkData, getPriceFeedsData } from "@/lib/pyth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LastPrice } from "@/components/CryptoChart/price"
import { PythChart } from "@/components/CryptoChart/pyth-chart"
import { TokenCommand } from "@/components/CryptoChart/token-command"

interface CryptoChartProps {
  ticker: string
}

export function CryptoChart({ ticker }: CryptoChartProps) {
  const benchmarkPromise = getBenchmarkData(ticker)
  const priceFeedPromise = getPriceFeedsData()

  return (
    <Card className="w-full max-w-none rounded-none border-0 border-b border-[#181F25]/70 bg-[#07090b]">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 py-5 sm:py-6 md:px-6">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <ErrorBoundary
            fallback={<span className="text-sm text-red-600">Error</span>}
          >
            <Suspense fallback={<CardTitle>{ticker}</CardTitle>}>
              <TokenCommand priceFeedData={priceFeedPromise} />
            </Suspense>
          </ErrorBoundary>
          <CardDescription>{ticker} last 30d</CardDescription>
        </div>
        <ErrorBoundary
          fallback={<span className="text-sm text-red-600">Error</span>}
        >
          <Suspense
            fallback={
              <div className="h-5 w-40 animate-pulse rounded bg-gray-50/10 md:h-7 md:w-64" />
            }
          >
            <LastPrice benchmark={benchmarkPromise} />
          </Suspense>
        </ErrorBoundary>
      </CardHeader>
      <CardContent className="w-full px-2 sm:p-6">
        <div className="flex aspect-auto h-[400px] w-full flex-col items-center justify-center">
          <ErrorBoundary
            fallback={
              <span className="text-sm text-red-600">
                Error with Pyth (ticker not found?)
              </span>
            }
          >
            <Suspense fallback={<ChartSkeleton />}>
              <PythChart benchmark={benchmarkPromise} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </CardContent>
    </Card>
  )
}

const ChartSkeleton = () => {
  return (
    <div className="flex h-[400px] w-full animate-pulse items-center justify-center">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        height="240"
        viewBox="0 0 1176 1474"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M734.994 589.59C734.994 670.991 669.173 736.992 587.994 736.992V884.393C750.352 884.393 881.994 752.392 881.994 589.59C881.994 426.789 750.352 294.787 587.994 294.787C534.473 294.787 484.21 309.121 440.994 334.254C353.1 385.188 293.994 480.456 293.994 589.59V1326.6L426.168 1459.13L440.994 1474V589.59C440.994 508.189 506.815 442.189 587.994 442.189C669.173 442.189 734.994 508.189 734.994 589.59Z"
          fill="#110F23"
        />
        <path
          d="M588 0C480.891 0 380.498 28.7336 294 78.9342C238.617 111.001 189.019 151.868 147 199.669C55.5156 303.603 0 440.138 0 589.606V1031.81L147 1179.21V589.606C147 458.672 203.779 341.004 294 260.003C336.418 222.002 386.216 192.002 441 172.669C486.942 156.268 536.474 147.402 588 147.402C831.537 147.402 1029 345.404 1029 589.606C1029 833.809 831.537 1031.81 588 1031.81V1179.21C912.783 1179.21 1176 915.21 1176 589.606C1176 264.003 912.783 0 588 0Z"
          fill="#110F23"
        />
      </svg>
    </div>
  )
}
