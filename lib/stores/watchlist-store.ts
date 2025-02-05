import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WatchlistItem {
  id: string
  type: "stock" | "crypto"
  symbol: string
  name: string
}

interface WatchlistStore {
  items: WatchlistItem[]
  addItem: (item: WatchlistItem) => void
  removeItem: (id: string) => void
  isInWatchlist: (id: string) => boolean
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        if (!items.find((i) => i.id === item.id)) {
          set({ items: [...items, item] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      isInWatchlist: (id) => {
        return get().items.some((item) => item.id === id)
      },
    }),
    {
      name: "watchlist-storage",
    },
  ),
)

