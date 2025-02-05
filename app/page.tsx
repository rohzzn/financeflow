import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, Star, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          FinanceFlow
        </h1>
        <p className="text-lg text-muted-foreground max-w-[42rem] mx-auto">
          Professional financial insights: Track stocks and cryptocurrencies, create watchlists, and stay updated with
          the latest market news.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link href="/stocks" className="block group">
          <Card className="transition-all hover:shadow-lg hover:shadow-blue-500/20 border border-zinc-800">
            <CardContent className="p-6 space-y-4">
              <BarChart2 className="h-8 w-8 text-blue-400" />
              <h3 className="font-semibold text-lg">Stocks</h3>
              <p className="text-muted-foreground">Track and analyze stock market performance with real-time data</p>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cryptocurrencies" className="block group">
          <Card className="transition-all hover:shadow-lg hover:shadow-purple-500/20 border border-zinc-800">
            <CardContent className="p-6 space-y-4">
              <BarChart2 className="h-8 w-8 text-purple-400" />
              <h3 className="font-semibold text-lg">Cryptocurrencies</h3>
              <p className="text-muted-foreground">Stay updated with cryptocurrency markets and trends</p>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/watchlist" className="block group">
          <Card className="transition-all hover:shadow-lg hover:shadow-indigo-500/20 border border-zinc-800">
            <CardContent className="p-6 space-y-4">
              <Star className="h-8 w-8 text-indigo-400" />
              <h3 className="font-semibold text-lg">Watchlist</h3>
              <p className="text-muted-foreground">Create and manage your personalized watchlist</p>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}