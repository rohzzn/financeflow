import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ChevronUp, ChevronDown } from "lucide-react"
import { FavoriteButton } from "@/components/ui/favorite-button"

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
}: {
  data: StockData[] | { error: string; details: string }
}) {
  if ("error" in data) {
    return (
      <Card className="bg-destructive/10">
        <CardContent className="flex items-center justify-center p-4 text-destructive">
          <AlertCircle className="mr-2" />
          <span>Error: {data.error}</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Symbol</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="text-right font-semibold">Price</TableHead>
            <TableHead className="text-right font-semibold">Change</TableHead>
            <TableHead className="text-right font-semibold hidden md:table-cell">High</TableHead>
            <TableHead className="text-right font-semibold hidden md:table-cell">Low</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock) => (
            <TableRow key={stock.symbol} className="hover:bg-accent hover:bg-opacity-10 transition-colors">
              <TableCell>
                <div className="flex items-center">
                  <img src={stock.logo || "/placeholder.svg"} alt={stock.name} className="w-6 h-6 mr-2 rounded-full" />
                  <span className="font-medium">{stock.symbol}</span>
                </div>
              </TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell className="text-right">${stock.price?.toFixed(2) ?? "N/A"}</TableCell>
              <TableCell className={`text-right ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stock.change >= 0 ? <ChevronUp className="inline mr-1" /> : <ChevronDown className="inline mr-1" />}
                {stock.change?.toFixed(2) ?? "N/A"} ({stock.changePercent?.toFixed(2) ?? "N/A"}%)
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">${stock.high?.toFixed(2) ?? "N/A"}</TableCell>
              <TableCell className="text-right hidden md:table-cell">${stock.low?.toFixed(2) ?? "N/A"}</TableCell>
              <TableCell>
                <FavoriteButton id={stock.symbol} type="stock" symbol={stock.symbol} name={stock.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

