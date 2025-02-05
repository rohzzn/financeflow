import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  previousClose: number
  timestamp: string
  logo: string
}

export default function StockList({
  data,
  onSelect,
}: {
  data: StockData[] | { error: string; details: string }
  onSelect: (symbol: string) => void
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  if ("error" in data) {
    return (
      <Card className="bg-red-50">
        <CardContent className="flex items-center justify-center p-4 text-red-700">
          <AlertCircle className="mr-2" />
          <span>Error: {data.error}</span>
        </CardContent>
      </Card>
    )
  }

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right hidden md:table-cell">High</TableHead>
              <TableHead className="text-right hidden md:table-cell">Low</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((stock) => (
              <TableRow
                key={stock.symbol}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => onSelect(stock.symbol)}
              >
                <TableCell>
                  <div className="flex items-center">
                    <img src={stock.logo || "/placeholder.svg"} alt={stock.name} className="w-6 h-6 mr-2" />
                    {stock.symbol}
                  </div>
                </TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">${stock.price?.toFixed(2) ?? "N/A"}</TableCell>
                <TableCell className={`text-right ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {stock.change >= 0 ? <ChevronUp className="inline mr-1" /> : <ChevronDown className="inline mr-1" />}
                  {stock.change?.toFixed(2) ?? "N/A"} ({stock.changePercent?.toFixed(2) ?? "N/A"}%)
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">${stock.high?.toFixed(2) ?? "N/A"}</TableCell>
                <TableCell className="text-right hidden md:table-cell">${stock.low?.toFixed(2) ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span>
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

