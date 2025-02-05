"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWatchlistStore } from "@/lib/stores/watchlist-store"
import { useToast } from "@/components/ui/use-toast"
import type React from "react" // Added import for React

interface FavoriteButtonProps {
  id: string
  type: "stock" | "crypto"
  symbol: string
  name: string
}

export function FavoriteButton({ id, type, symbol, name }: FavoriteButtonProps) {
  const { addItem, removeItem, isInWatchlist } = useWatchlistStore()
  const { toast } = useToast()
  const isFavorited = isInWatchlist(id)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFavorited) {
      removeItem(id)
      toast({
        title: "Removed from Watchlist",
        description: `${name} has been removed from your watchlist.`,
      })
    } else {
      addItem({ id, type, symbol, name })
      toast({
        title: "Added to Watchlist",
        description: `${name} has been added to your watchlist.`,
      })
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`${isFavorited ? "text-yellow-400" : "text-muted-foreground"} hover:text-yellow-400 hover:bg-accent hover:bg-opacity-10`}
    >
      <Star className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
    </Button>
  )
}

