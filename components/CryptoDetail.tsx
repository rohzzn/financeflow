"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export default function CryptoDetail({ coinId, onClose }: { coinId: string; onClose: () => void }) {
  const [coinData, setCoinData] = useState<any>(null)
  const [historicalData, setHistoricalData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [coinResponse, historyResponse] = await Promise.all([
          fetcher(`https://api.coingecko.com/api/v3/coins/${coinId}`),
          fetcher(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`),
        ])
        setCoinData(coinResponse)
        setHistoricalData(
          historyResponse.prices.map((item: [number, number]) => ({
            date: new Date(item[0]).toLocaleDateString(),
            price: item[1],
          })),
        )
      } catch (err) {
        console.error("Error fetching coin data:", err)
        setError("Failed to fetch coin data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [coinId])

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : coinData ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <img src={coinData.image.small || "/placeholder.svg"} alt={coinData.name} className="w-6 h-6 mr-2" />
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </DialogTitle>
              <DialogDescription>
                Current Price: ${coinData.market_data.current_price.usd.toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 my-4">
              <div>
                <p>
                  <strong>Market Cap Rank:</strong> #{coinData.market_cap_rank}
                </p>
                <p>
                  <strong>Market Cap:</strong> ${coinData.market_data.market_cap.usd.toLocaleString()}
                </p>
                <p>
                  <strong>24h Volume:</strong> ${coinData.market_data.total_volume.usd.toLocaleString()}
                </p>
              </div>
              <div>
                <p>
                  <strong>24h High:</strong> ${coinData.market_data.high_24h.usd.toLocaleString()}
                </p>
                <p>
                  <strong>24h Low:</strong> ${coinData.market_data.low_24h.usd.toLocaleString()}
                </p>
                <p>
                  <strong>Circulating Supply:</strong> {coinData.market_data.circulating_supply.toLocaleString()}{" "}
                  {coinData.symbol.toUpperCase()}
                </p>
              </div>
            </div>
            {historicalData && (
              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        ) : (
          <div>Failed to load coin data</div>
        )}
      </DialogContent>
    </Dialog>
  )
}

