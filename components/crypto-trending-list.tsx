"use client"

import useSWR from "swr"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CryptoTrendingList() {
  const { data, error } = useSWR("https://api.coingecko.com/api/v3/search/trending", fetcher)

  if (error) return <div>Failed to load trending cryptocurrencies</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      {data.coins.slice(0, 5).map((coin: any) => (
        <Card key={coin.item.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <img src={coin.item.small || "/placeholder.svg"} alt={coin.item.name} className="w-8 h-8 mr-2" />
              <div>
                <p className="font-medium">{coin.item.name}</p>
                <p className="text-sm text-gray-500">{coin.item.symbol}</p>
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-sm font-medium">#{coin.item.market_cap_rank}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

