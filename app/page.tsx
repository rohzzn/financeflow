import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart2, Star, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative w-full py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 md:text-6xl">
              Professional Financial Insights
            </h1>
            <p className="mb-12 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
              Track stocks and cryptocurrencies, create watchlists, and stay updated with the latest market news in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container px-4 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Stocks Card */}
          <Link href="/stocks" className="block group">
            <Card className="h-full transition-all duration-200 bg-white dark:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/5">
              <CardContent className="flex flex-col h-full p-6 space-y-4">
                <div className="p-3 text-blue-600 bg-blue-100 rounded-lg w-fit dark:bg-blue-900/30 dark:text-blue-400">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Stocks</h3>
                <p className="flex-grow text-gray-600 dark:text-gray-300">
                  Track and analyze stock market performance with real-time data and advanced analytics.
                </p>
                <div className="flex items-center pt-4 text-blue-600 transition-all group-hover:translate-x-2 dark:text-blue-400">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Cryptocurrencies Card */}
          <Link href="/cryptocurrencies" className="block group">
            <Card className="h-full transition-all duration-200 bg-white dark:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/5">
              <CardContent className="flex flex-col h-full p-6 space-y-4">
                <div className="p-3 text-indigo-600 bg-indigo-100 rounded-lg w-fit dark:bg-indigo-900/30 dark:text-indigo-400">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Cryptocurrencies</h3>
                <p className="flex-grow text-gray-600 dark:text-gray-300">
                  Stay updated with cryptocurrency markets and trends with comprehensive analysis tools.
                </p>
                <div className="flex items-center pt-4 text-indigo-600 transition-all group-hover:translate-x-2 dark:text-indigo-400">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Watchlist Card */}
          <Link href="/watchlist" className="block group">
            <Card className="h-full transition-all duration-200 bg-white dark:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/5">
              <CardContent className="flex flex-col h-full p-6 space-y-4">
                <div className="p-3 text-purple-600 bg-purple-100 rounded-lg w-fit dark:bg-purple-900/30 dark:text-purple-400">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Watchlist</h3>
                <p className="flex-grow text-gray-600 dark:text-gray-300">
                  Create and manage your personalized watchlist with custom alerts and tracking.
                </p>
                <div className="flex items-center pt-4 text-purple-600 transition-all group-hover:translate-x-2 dark:text-purple-400">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}