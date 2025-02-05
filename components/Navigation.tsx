"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ui/mode-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/stocks", label: "Stocks" },
  { href: "/crypto", label: "Crypto" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/news", label: "News" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            FinanceFlow
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}