import { NextResponse } from "next/server"

const FINNHUB_API_KEY = "cuh8gq1r01qva71t7efgcuh8gq1r01qva71t7eg0"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbols = searchParams.get("symbols")?.split(",") || []

  if (symbols.length === 0) {
    return NextResponse.json([])
  }

  try {
    const quotes = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
        const quote = await response.json()
        const profileResponse = await fetch(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
        )
        const profile = await profileResponse.json()

        return {
          symbol,
          name: profile.name || symbol,
          price: quote.c,
          change: quote.d,
          changePercent: quote.dp,
          high: quote.h,
          low: quote.l,
          open: quote.o,
          previousClose: quote.pc,
          timestamp: new Date(quote.t * 1000).toISOString(),
          logo: profile.logo || `/placeholder.svg?text=${symbol}`,
        }
      }),
    )

    return NextResponse.json(quotes)
  } catch (error) {
    console.error("Error fetching watchlist data:", error)
    return NextResponse.json({ error: "Failed to fetch watchlist data" }, { status: 500 })
  }
}

