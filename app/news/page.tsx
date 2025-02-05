"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsFeed from "@/components/news-feed"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search is handled within the NewsFeed component
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Financial News</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <TabsList>
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="economy">Economy</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <NewsFeed category="all" searchTerm={searchTerm} />
            </TabsContent>
            <TabsContent value="stocks">
              <NewsFeed category="stocks" searchTerm={searchTerm} />
            </TabsContent>
            <TabsContent value="crypto">
              <NewsFeed category="crypto" searchTerm={searchTerm} />
            </TabsContent>
            <TabsContent value="economy">
              <NewsFeed category="economy" searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

