"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { ArrowUpDown, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CryptoList from "@/components/crypto-list"
import CryptoDetail from "@/components/crypto-detail"
import { timeFrames } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CryptoMarketOverview from "@/components/crypto-market-overview"
import CryptoTrendingList from "@/components/crypto-trending-list"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CryptocurrenciesPage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortBy, setSortBy] = useState<string>("market_cap")
  const [timeFrame, setTimeFrame] = useState<string>("24h")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)

  const {
    data: cryptoData,
    error: cryptoError,
    isLoading: cryptoIsLoading,
  } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${sortBy}_${sortOrder}&per_page=250&page=1&sparkline=true&price_change_percentage=1h,24h,7d,30d,200d,1y`,
    fetcher,
    { refreshInterval: 60000 },
  )

  const [sortedCryptoData, setSortedCryptoData] = useState<any[]>([])

  useEffect(() => {
    if (cryptoData && Array.isArray(cryptoData)) {
      const filtered = cryptoData.filter(
        (coin: any) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      const sorted = [...filtered].sort((a: any, b: any) => {
        const aValue = a[sortBy] || a[`price_change_percentage_${timeFrame}`] || 0
        const bValue = b[sortBy] || b[`price_change_percentage_${timeFrame}`] || 0
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue
      })
      setSortedCryptoData(sorted)
    }
  }, [cryptoData, sortOrder, sortBy, timeFrame, searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value)
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cryptocurrency Market</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full sm:w-64"
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
              <Select onValueChange={handleSortChange} defaultValue={sortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market_cap">Market Cap</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="current_price">Price</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={handleTimeFrameChange} defaultValue={timeFrame}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time frame" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(timeFrames).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className="w-[100px]"
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {sortOrder === "desc" ? "Desc" : "Asc"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <CryptoMarketOverview />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trending Cryptocurrencies</CardTitle>
        </CardHeader>
        <CardContent>
          <CryptoTrendingList />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency List</CardTitle>
        </CardHeader>
        <CardContent>
          {cryptoIsLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            </div>
          )}
          {cryptoError && (
            <div className="text-destructive text-center text-lg">
              Failed to load cryptocurrency data. Please try again later.
            </div>
          )}
          {sortedCryptoData.length > 0 && (
            <CryptoList data={sortedCryptoData} timeFrame={timeFrame} onSelect={setSelectedCrypto} />
          )}
        </CardContent>
      </Card>

      {selectedCrypto && <CryptoDetail coinId={selectedCrypto} onClose={() => setSelectedCrypto(null)} />}
    </div>
  )
}

