"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, AlertCircle, ExternalLink } from "lucide-react"
import Image from "next/image"

interface NewsItem {
  title: string
  url: string
  source: string
  time: number
  summary: string
  imageUrl: string
  category: string
}

export default function NewsFeed({ category = "all", searchTerm = "" }: { category?: string; searchTerm?: string }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/news?category=${category}`)
        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }
        const data = await response.json()
        setNews(data)
      } catch (err) {
        setError("Failed to fetch news. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [category])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-700 rounded-lg">
        <AlertCircle className="mr-2" />
        <span>{error}</span>
      </div>
    )
  }

  if (!news || news.length === 0) {
    return <div className="text-center text-gray-500">No news available at the moment.</div>
  }

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredNews.map((item, index) => (
        <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
          <CardContent className="p-0">
            {item.imageUrl && (
              <div className="relative h-48">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 hover:text-blue-600">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  {item.title}
                  <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
                </a>
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{item.source}</span>
                <span>{new Date(item.time).toLocaleDateString()}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

