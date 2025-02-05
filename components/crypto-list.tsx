import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { timeFrames } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FavoriteButton } from "@/components/ui/favorite-button"

export default function CryptoList({
  data,
  timeFrame,
  onSelect,
}: {
  data: any[]
  timeFrame: string
  onSelect: (id: string) => void
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="text-right font-semibold">Price</TableHead>
              <TableHead className="text-right font-semibold">{timeFrames[timeFrame]}</TableHead>
              <TableHead className="hidden sm:table-cell font-semibold">7d Chart</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((coin) => (
              <TableRow
                key={coin.id}
                className="hover:bg-accent hover:bg-opacity-10 transition-colors"
                onClick={() => onSelect(coin.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-6 h-6 mr-2 rounded-full" />
                    <span>{coin.name}</span>
                    <span className="text-muted-foreground ml-2 hidden sm:inline">({coin.symbol.toUpperCase()})</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  $
                  {coin.current_price?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    coin[`price_change_percentage_${timeFrame}`] > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {coin[`price_change_percentage_${timeFrame}`]?.toFixed(2) ?? "N/A"}%
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="h-10 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={
                          coin.sparkline_in_7d?.price?.map((price: number, index: number) => ({ price, index })) ?? []
                        }
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
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <FavoriteButton id={coin.id} type="crypto" symbol={coin.symbol.toUpperCase()} name={coin.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

