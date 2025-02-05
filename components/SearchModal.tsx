"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSearchModal } from "@/hooks/useSearchModal"
import { useRouter } from "next/navigation"

export default function SearchModal() {
  const [searchTerm, setSearchTerm] = useState("")
  const { isOpen, closeModal } = useSearchModal()
  const router = useRouter()

  const handleSearch = useCallback(() => {
    if (searchTerm) {
      closeModal()
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }, [searchTerm, closeModal, router])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        useSearchModal.getState().openModal()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <Input
          type="text"
          placeholder="Search stocks, crypto, or news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </DialogContent>
    </Dialog>
  )
}

