import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"

export default function CryptoGrid({
  data,
  timeFrame,
  onSelect,
}: { data: any[]; timeFrame: string; onSelect: (id: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((coin) => (
        <Card
          key={coin.id}
          className="overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
          onClick={() => onSelect(coin.id)}
        >
          <CardHeader className="bg-gray-100 p-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-6 h-6 mr-2" />
                <span className="font-semibold truncate">{coin.name}</span>
                <span className="text-gray-500 ml-2 text-sm hidden sm:inline">({coin.symbol.toUpperCase()})</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-bold">
                $
                {coin.current_price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? "N/A"}
              </p>
              <p
                className={`font-semibold ${
                  coin[`price_change_percentage_${timeFrame}`] > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {coin[`price_change_percentage_${timeFrame}`]?.toFixed(2) ?? "N/A"}%
              </p>
            </div>
            <div className="h-16 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={coin.sparkline_in_7d?.price?.map((price: number, index: number) => ({ price, index })) ?? []}
                >
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={coin[`price_change_percentage_${timeFrame}`] > 0 ? "#22c55e" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

