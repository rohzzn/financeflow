"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { ArrowUpDown, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StockList from "@/components/stock-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function StocksPage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortBy, setSortBy] = useState<string>("price")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const {
    data: stockData,
    error: stockError,
    isLoading: stockIsLoading,
  } = useSWR("/api/stocks", fetcher, { refreshInterval: 60000 })

  const [filteredStockData, setFilteredStockData] = useState<any[]>([])

  useEffect(() => {
    if (stockData && Array.isArray(stockData)) {
      const filtered = stockData.filter(
        (stock: any) =>
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      const sorted = [...filtered].sort((a, b) => {
        const aValue = a[sortBy] || 0
        const bValue = b[sortBy] || 0
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue
      })
      setFilteredStockData(sorted)
    } else {
      setFilteredStockData([])
    }
  }, [stockData, sortOrder, sortBy, searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Top Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="flex items-center w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Search stocks..."
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
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">Change</SelectItem>
                  <SelectItem value="changePercent">Change %</SelectItem>
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
          {stockIsLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            </div>
          )}
          {stockError && (
            <div className="text-destructive text-center text-lg">
              Failed to load stock data. Please try again later.
            </div>
          )}
          {!stockIsLoading && !stockError && filteredStockData.length === 0 && (
            <div className="text-center text-muted-foreground">
              No stocks found. Try adjusting your search or filters.
            </div>
          )}
          {filteredStockData.length > 0 && <StockList data={filteredStockData} />}
        </CardContent>
      </Card>
    </div>
  )
}

