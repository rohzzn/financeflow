"use client"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function MarketOverview() {
  const { data, error } = useSWR("/api/market-overview", fetcher)

  if (error) return <div>Failed to load market overview</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-2" />
            <div>
              <p className="text-sm font-medium">S&P 500</p>
              <p className="text-2xl font-bold">{data.sp500.value}</p>
            </div>
          </div>
          <p className={`text-sm ${data.sp500.change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {data.sp500.change >= 0 ? "+" : ""}
            {data.sp500.change}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <p className="text-sm font-medium">USD Index</p>
              <p className="text-2xl font-bold">{data.usdIndex.value}</p>
            </div>
          </div>
          <p className={`text-sm ${data.usdIndex.change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {data.usdIndex.change >= 0 ? "+" : ""}
            {data.usdIndex.change}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-yellow-500 mr-2" />
            <div>
              <p className="text-sm font-medium">VIX</p>
              <p className="text-2xl font-bold">{data.vix.value}</p>
            </div>
          </div>
          <p className={`text-sm ${data.vix.change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {data.vix.change >= 0 ? "+" : ""}
            {data.vix.change}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-purple-500 mr-2" />
            <div>
              <p className="text-sm font-medium">10Y Treasury Yield</p>
              <p className="text-2xl font-bold">{data.treasuryYield.value}%</p>
            </div>
          </div>
          <p className={`text-sm ${data.treasuryYield.change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {data.treasuryYield.change >= 0 ? "+" : ""}
            {data.treasuryYield.change}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

