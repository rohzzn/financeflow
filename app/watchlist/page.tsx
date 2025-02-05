"use client"

import { useEffect, useState } from "react"
import { useWatchlistStore } from "@/lib/stores/watchlist-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, ChevronUp, ChevronDown } from "lucide-react"

interface WatchlistData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  volume?: number
  marketCap?: number
}

export default function WatchlistPage() {
  const { items } = useWatchlistStore()
  const [stocksData, setStocksData] = useState<Record<string, WatchlistData>>({})
  const [cryptoData, setCryptoData] = useState<Record<string, WatchlistData>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const stockSymbols = items.filter((item) => item.type === "stock").map((item) => item.symbol)
        const cryptoIds = items.filter((item) => item.type === "crypto").map((item) => item.id)

        if (stockSymbols.length > 0) {
          const stocksResponse = await fetch(`/api/watchlist?symbols=${stockSymbols.join(",")}`)
          if (!stocksResponse.ok) throw new Error("Failed to fetch stocks data")
          const stocksData = await stocksResponse.json()
          const stocksMap = stocksData.reduce((acc: Record<string, WatchlistData>, item: WatchlistData) => {
            acc[item.symbol] = item
            return acc
          }, {})
          setStocksData(stocksMap)
        }

        if (cryptoIds.length > 0) {
          const cryptoResponse = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(",")}&sparkline=false`,
          )
          if (!cryptoResponse.ok) throw new Error("Failed to fetch crypto data")
          const cryptoData = await cryptoResponse.json()
          const cryptoMap = cryptoData.reduce((acc: Record<string, WatchlistData>, item: any) => {
            acc[item.symbol.toUpperCase()] = {
              symbol: item.symbol.toUpperCase(),
              name: item.name,
              price: item.current_price,
              change: item.price_change_24h,
              changePercent: item.price_change_percentage_24h,
              high: item.high_24h,
              low: item.low_24h,
              volume: item.total_volume,
              marketCap: item.market_cap,
            }
            return acc
          }, {})
          setCryptoData(cryptoMap)
        }
      } catch (error) {
        console.error("Error fetching watchlist data:", error)
        setError("Failed to fetch watchlist data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [items])

  const renderWatchlistTable = (type: "stock" | "crypto") => {
    const filteredItems = items.filter((item) => item.type === type)
    const data = type === "stock" ? stocksData : cryptoData

    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No {type}s in watchlist. Add some from the {type}s page!
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">24h High</TableHead>
              <TableHead className="text-right">24h Low</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => {
              const itemData = data[item.symbol]
              if (!itemData) return null

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{itemData.symbol}</TableCell>
                  <TableCell>{itemData.name}</TableCell>
                  <TableCell className="text-right">${itemData.price.toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${itemData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {itemData.change >= 0 ? (
                      <ChevronUp className="inline mr-1" />
                    ) : (
                      <ChevronDown className="inline mr-1" />
                    )}
                    {itemData.change.toFixed(2)} ({itemData.changePercent.toFixed(2)}%)
                  </TableCell>
                  <TableCell className="text-right">${itemData.high.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${itemData.low.toFixed(2)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6 text-destructive">{error}</CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Stocks</h3>
                    {renderWatchlistTable("stock")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Cryptocurrencies</h3>
                    {renderWatchlistTable("crypto")}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="stocks">{renderWatchlistTable("stock")}</TabsContent>
              <TabsContent value="crypto">{renderWatchlistTable("crypto")}</TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

