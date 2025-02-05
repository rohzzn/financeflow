import { Star } from "lucide-react"
import { Button } from "./button"
import { useWatchlistStore } from "@/lib/stores/watchlist-store"

interface FavoriteButtonProps {
  id: string
  type: "stock" | "crypto"
  symbol: string
  name: string
}

export function FavoriteButton({ id, type, symbol, name }: FavoriteButtonProps) {
  const { addItem, removeItem, isInWatchlist } = useWatchlistStore()
  const isFavorited = isInWatchlist(id)

  const handleClick = () => {
    if (isFavorited) {
      removeItem(id)
    } else {
      addItem({ id, type, symbol, name })
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={isFavorited ? "text-yellow-400" : "text-muted-foreground"}
    >
      <Star className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
    </Button>
  )
}

