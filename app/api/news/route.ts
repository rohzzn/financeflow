import { NextResponse } from "next/server"
import axios from "axios"

const FINNHUB_API_KEY = "cuh8gq1r01qva71t7efgcuh8gq1r01qva71t7eg0"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "general"

  try {
    const response = await axios.get(`https://finnhub.io/api/v1/news?category=${category}&token=${FINNHUB_API_KEY}`)

    const news = response.data.map((article: any) => ({
      title: article.headline,
      url: article.url,
      source: article.source,
      time: article.datetime * 1000,
      summary: article.summary,
      imageUrl: article.image,
      category: article.category,
    }))

    return NextResponse.json(news.slice(0, 30))
  } catch (error) {
    console.error("Error fetching news data:", error)
    return NextResponse.json({ error: "Failed to fetch news data" }, { status: 500 })
  }
}

