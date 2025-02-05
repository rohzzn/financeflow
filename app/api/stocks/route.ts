import { NextResponse } from "next/server"

const FINNHUB_API_KEY = "cuh8gq1r01qva71t7efgcuh8gq1r01qva71t7eg0"

// Top 30 stocks by market cap (as of 2023)
const TOP_STOCKS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "NVDA",
  "META",
  "TSLA",
  "BRK.B",
  "UNH",
  "XOM",
  "JPM",
  "JNJ",
  "V",
  "PG",
  "MA",
  "HD",
  "CVX",
  "AVGO",
  "MRK",
  "KO",
  "PEP",
  "ABBV",
  "COST",
  "WMT",
  "CSCO",
  "LLY",
  "BAC",
  "TMO",
  "MCD",
  "CRM",
]

export async function GET() {
  try {
    const stockData = await Promise.all(
      TOP_STOCKS.map(async (symbol) => {
        try {
          const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`

          const [quoteResponse, profileResponse] = await Promise.all([fetch(quoteUrl), fetch(profileUrl)])

          if (!quoteResponse.ok || !profileResponse.ok) {
            throw new Error(`HTTP error! status: ${quoteResponse.status} or ${profileResponse.status}`)
          }

          const [quoteData, profileData] = await Promise.all([quoteResponse.json(), profileResponse.json()])

          return {
            symbol,
            name: profileData.name || symbol,
            price: quoteData.c,
            change: quoteData.d,
            changePercent: quoteData.dp,
            high: quoteData.h,
            low: quoteData.l,
            open: quoteData.o,
            previousClose: quoteData.pc,
            timestamp: new Date(quoteData.t * 1000).toISOString(),
            logo: profileData.logo || `/placeholder.svg?text=${symbol}`,
          }
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error)
          return null
        }
      }),
    )

    const validStockData = stockData.filter(Boolean)

    if (validStockData.length === 0) {
      throw new Error("No valid stock data retrieved")
    }

    return NextResponse.json(validStockData)
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ error: "Failed to fetch stock data", details: error.message }, { status: 500 })
  }
}

