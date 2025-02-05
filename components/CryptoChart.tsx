import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { timeFrames } from "@/lib/constants"

export default function CryptoChart({ data, timeFrame }: { data: any[]; timeFrame: string }) {
  const chartData = data.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    value: coin[`price_change_percentage_${timeFrame}`] ?? 0,
  }))

  const formatYAxis = (value: number) => `${value.toFixed(2)}%`

  return (
    <div className="h-[600px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={formatYAxis}
            label={{ value: `${timeFrames[timeFrame]} Price Change`, angle: -90, position: "insideLeft", offset: 0 }}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)}%`, `Price Change`]}
            contentStyle={{ backgroundColor: "white", borderColor: "black" }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Bar dataKey="value" fill={(entry) => (entry.value > 0 ? "#22c55e" : "#ef4444")} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

