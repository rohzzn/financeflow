"use client"

import useSWR from "swr"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CryptoMarketOverview() {
  const { data, error } = useSWR("https://api.coingecko.com/api/v3/global", fetcher)

  if (error) return <div>Failed to load market overview</div>
  if (!data) return <div>Loading...</div>

  const { data: marketData } = data

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <p className="text-sm font-medium">Market Cap</p>
              <p className="text-2xl font-bold">${marketData.total_market_cap.usd.toLocaleString()}</p>
            </div>
          </div>
          <p
            className={`text-sm ${marketData.market_cap_change_percentage_24h_usd >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {marketData.market_cap_change_percentage_24h_usd >= 0 ? "+" : ""}
            {marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-yellow-500 mr-2" />
            <div>
              <p className="text-sm font-medium">24h Volume</p>
              <p className="text-2xl font-bold">${marketData.total_volume.usd.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-2" />
            <div>
              <p className="text-sm font-medium">BTC Dominance</p>
              <p className="text-2xl font-bold">{marketData.market_cap_percentage.btc.toFixed(2)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-purple-500 mr-2" />
            <div>
              <p className="text-sm font-medium">Active Cryptocurrencies</p>
              <p className="text-2xl font-bold">{marketData.active_cryptocurrencies.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

